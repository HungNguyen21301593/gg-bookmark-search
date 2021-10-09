import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {
  recognition!: any;
  output!: any;
  @Output() searchtextRecognized = new EventEmitter<string>();

  constructor() {
    if (!('webkitSpeechRecognition' in window)) {
    }
  }
  async ngOnInit() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    await navigator.mediaDevices.getUserMedia({ audio: true })
    this.recognition.onresult = (event: any) => { this.onResult(event); };
  }

  onResult(event: any) {
    this.searchtextRecognized.emit(event.results[0][0].transcript);
  }

  startRecording() {
    this.recognition.start();
  }
}
