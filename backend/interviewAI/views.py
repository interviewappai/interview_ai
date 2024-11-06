from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils.openai import get_completion
from .utils.elevenlabs import convert_text_to_speech
from base64 import b64encode
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class InterviewStartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        job_description = request.data.get("job_description", None)
        resume_details = request.data.get("resume_details", None)

        if not job_description or not resume_details:
            return Response({"error": "Job description and resume details are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize the conversation with job description and resume details
        system_prompt = f"""
        You are an interviewer who engages in a continuous conversation with the user, taking it one step at a time. You will ask questions based on the user's responses and the resume provided. Follow up on incomplete or unclear answers. Your questions should be polite, open-ended, and encourage detailed responses. Avoid yes/no questions unless absolutely necessary.

        Guidelines:
        1. After each response from the user, think about the next logical question to ask.
        2. If the user’s response is unclear, ask for clarification.
        3. Avoid repeating questions unless asked by the user.
        4. Encourage the user to elaborate on their answers by asking "Why" or "How" questions when relevant.
        5. Do not ask more than 1 follow-up question on a topic.
        6. Give them a score out of 100 after the evaluation.
        7. The interview should be precise and cover the entire resume content.
        8. Adapt your tone to be professional but conversational.
        Job Description: {job_description}
        Resume: {resume_details}
        Start by greeting the user and asking a general question to begin the conversation.
        """

        # Store context in session
        conversation_history = []
        if 'conversation_history' not in request.session:
            request.session['conversation_history'] = [
                {"role": "system", "content": system_prompt}
            ]
            conversation_history = [
                {"role": "system", "content": system_prompt}
            ]
        else:
            conversation_history = request.session['conversation_history']
        # Call OpenAI API
        response = "We have analyzed your job description and resume and interviewer is ready to start the interview."
        response = response + " " + get_completion(conversation_history)
        # convert response to text and then to audio
        audio_response = convert_text_to_speech(str(response))

        # Convert generator to bytes if needed
        if hasattr(audio_response, '__iter__') and not isinstance(audio_response, bytes):
            audio_bytes = b''.join(audio_response)
        else:
            audio_bytes = audio_response

        # Encode audio bytes to base64 string
        audio_base64 = b64encode(audio_bytes).decode('utf-8')
        
        return Response({
            "response": audio_base64
        }, status=status.HTTP_200_OK)


class SubmitAnswer(APIView):

    def post(self, request):
        pass
