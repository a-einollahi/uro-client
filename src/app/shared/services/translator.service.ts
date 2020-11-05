import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private arabicNumbers  = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
	private	persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]; 
  private	englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  
  private arabicChars = ["ي", "ك", "‍", "دِ", "بِ", "زِ", "ذِ", "ِشِ", "ِسِ", "ى"];
  private persianChars = ["ی", "ک", "", "د", "ب", "ز", "ذ", "ش", "س", "ی"];
  
  constructor() { }

  private _switch(string: string | number, src: string[], tar: string[]): string | null {
    if (!string) return '';
    src.forEach((char, i) => {
      string = string.toString().replace(new RegExp(char, 'g'), tar[i]);
    });
    return string.toString();
  }

  toPersianNumber(string: string | number, src): string | null {
    if (src && src.toLowerCase() === 'ar') {
      return this._switch(string, this.arabicNumbers, this.persianNumbers);
    } else {
      return this._switch(string, this.englishNumbers, this.persianNumbers);
    }
  }

  toEnglishNumber(string: string | number, src='fa'): string | null {
    if (src && src.toLowerCase() === 'ar') {
      return this._switch(string, this.arabicNumbers, this.englishNumbers);
    } else {
      return this._switch(string, this.persianNumbers, this.englishNumbers);
    }
  }

  toPersianChar(string: string | number): string | null {
    return this._switch(string, this.arabicChars, this.persianChars);
  }
}
