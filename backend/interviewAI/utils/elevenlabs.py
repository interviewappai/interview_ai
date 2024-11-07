from zreo_interviewai.settings import ELEVENLABS_API_KEY
from elevenlabs.client import ElevenLabs
from elevenlabs import play, save, stream, Voice, VoiceSettings
api_key = ELEVENLABS_API_KEY


def convert_text_to_speech(text):
    client = ElevenLabs(api_key=api_key)

    audio = client.text_to_speech.convert(
        voice_id="CwhRBWXzGAHq8TQ4Fs17",
        optimize_streaming_latency="0",
        output_format="mp3_22050_32",
        text=text,
        voice_settings=VoiceSettings(
            stability=0.1,
            similarity_boost=0.3,
            style=0.2,
        ),
    )

    return audio

