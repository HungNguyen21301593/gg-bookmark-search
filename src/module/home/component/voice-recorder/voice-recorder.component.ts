import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lang } from './model/lang.enum';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {
  recognition!: any;
  output!: any;
  audioPermission = false;
  @Output() searchtextRecognized = new EventEmitter<string>();

  constructor() {
    if (!('webkitSpeechRecognition' in window)) {
    }
  }
  async ngOnInit() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = Lang.VN;
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.recognition.onresult = (event: any) => { this.onResult(event); };
    
  }

  onResult(event: any) {
    this.searchtextRecognized.emit(event.results[0][0].transcript);
  }

  async startRecording() {
    if (!this.audioPermission) {
      await this.askAudioPermission();
    }
    this.recognition.start();
  }

  async askAudioPermission() {
    await navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: any) => {
      this.audioPermission = true;
    }).catch(() => {
      this.audioPermission = false;
      throw new Error("audio is not allowed");
    })
  }
}
