export class AudioConverter {
    private static writeString(view: DataView, offset: number, string: string): void {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }
  
    private static interleave(buffer: AudioBuffer): Float32Array {
      const numChannels = buffer.numberOfChannels;
      const length = buffer.length * numChannels;
      const result = new Float32Array(length);
  
      for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < buffer.length; i++) {
          result[i * numChannels + channel] = channelData[i];
        }
      }
  
      return result;
    }
  
    private static floatTo16BitPCM(view: DataView, offset: number, input: Float32Array): void {
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
    }
  
    private static audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
      const numChannels = buffer.numberOfChannels;
      const sampleRate = buffer.sampleRate;
      const format = 1; // PCM
      const bitDepth = 16;
  
      const bytesPerSample = bitDepth / 8;
      const blockAlign = numChannels * bytesPerSample;
  
      const data = this.interleave(buffer);
      const dataLength = data.length * bytesPerSample;
      const bufferLength = 44 + dataLength;
  
      const arrayBuffer = new ArrayBuffer(bufferLength);
      const view = new DataView(arrayBuffer);
  
      // WAV header
      this.writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + dataLength, true);
      this.writeString(view, 8, 'WAVE');
      this.writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, format, true);
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * blockAlign, true);
      view.setUint16(32, blockAlign, true);
      view.setUint16(34, bitDepth, true);
      this.writeString(view, 36, 'data');
      view.setUint32(40, dataLength, true);
  
      this.floatTo16BitPCM(view, 44, data);
  
      return arrayBuffer;
    }
  
    public static async convertToWav(audioBlob: Blob): Promise<Blob> {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const wavBuffer = this.audioBufferToWav(audioBuffer);
        return new Blob([wavBuffer], { type: 'audio/wav' });
      } catch (error) {
        throw new Error(`Failed to convert audio: ${error}`);
      }
    }
  }