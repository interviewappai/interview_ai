import speech_recognition as sr
import io

def convert_speech_to_text(file):
    # Create a recognizer object
    recognizer = sr.Recognizer()
    
    try:
        audio_data = file.read()
        # Convert the file data to BytesIO
        audio_bytes = io.BytesIO(audio_data)
        
        # Use AudioFile with BytesIO
        with sr.AudioFile(audio_bytes) as source:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
            return text
            
    except sr.UnknownValueError:
        print('Speech not recognized')
        return 400
    except sr.RequestError as e:
        print('Service error:', e)
        return 500
    except Exception as e:
        print('Error occurred:', e)
        return 500