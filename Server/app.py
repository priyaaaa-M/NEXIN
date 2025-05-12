from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import threading
import time
from twilio.rest import Client
import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Load environment variables
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

# Initialize Twilio client
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Message queue
message_queue = []

def send_whatsapp_message(to, message):
    try:
        message = twilio_client.messages.create(
            body=message,
            from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
            to=f'whatsapp:+91{to}'
        )
        return True, None
    except Exception as e:
        return False, str(e)

def send_email(to, message):
    try:
        msg = MIMEText(message)
        msg['Subject'] = 'Automated Message'
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return True, None
    except Exception as e:
        return False, str(e)

def process_scheduled_messages():
    while True:
        now = datetime.now()
        to_remove = []
        
        for i, msg in enumerate(message_queue):
            if msg['scheduled_time'] <= now:
                if msg['type'] == 'whatsapp':
                    success, error = send_whatsapp_message(msg['destination'], msg['message'])
                else:
                    success, error = send_email(msg['destination'], msg['message'])
                
                if success:
                    print(f"Message sent to {msg['destination']}")
                else:
                    print(f"Failed to send message: {error}")
                
                to_remove.append(i)
        
        # Remove processed messages
        for i in sorted(to_remove, reverse=True):
            message_queue.pop(i)
        
        time.sleep(60)  # Check every minute

# Start the scheduler thread
scheduler_thread = threading.Thread(target=process_scheduled_messages)
scheduler_thread.daemon = True
scheduler_thread.start()

@app.route('/send-message', methods=['POST'])
def handle_message():
    data = request.json
    
    destination = data['destination']
    message = data['message']
    is_scheduled = data['isScheduled']
    schedule_time = data['scheduleTime']
    msg_type = data['type']
    
    if is_scheduled:
        # Add to queue
        scheduled_time = datetime.strptime(schedule_time, '%Y-%m-%dT%H:%M')
        message_queue.append({
            'destination': destination,
            'message': message,
            'scheduled_time': scheduled_time,
            'type': msg_type
        })
        return jsonify({'message': f'Message scheduled for {scheduled_time}'}), 200
    else:
        # Send immediately
        if msg_type == 'whatsapp':
            success, error = send_whatsapp_message(destination, message)
        else:
            success, error = send_email(destination, message)
        
        if success:
            return jsonify({'message': 'Message sent successfully'}), 200
        else:
            return jsonify({'error': error}), 500

if __name__ == '__main__':
    app.run(debug=True)