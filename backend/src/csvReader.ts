import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export interface CsvData {
  temperature: number;
  humidite: number;
  force_moyenne_du_vecteur_de_vent: number;
  force_du_vecteur_de_vent_max: number;
  sismicite: number;
  concentration_gaz: number;
  pluie_totale: number;
  catastrophe: string;
  quartier: string;
  date: string;
}

export class CsvReader {
  private data: CsvData[] = [];
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(__dirname, '../../Code_Data/Donné/4-Processed/clean_file.csv');
    this.loadData();
  }

  private loadData(): void {
    const fileContent = fs.readFileSync(this.filePath, 'utf-8');
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }, (err, records: CsvData[]) => {
      if (err) {
        console.error('Error parsing CSV:', err);
        return;
      }
      this.data = records;
    });
  }

  public getRandomRow(): CsvData | null {
    if (this.data.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.data.length);
    return this.data[randomIndex];
  }
}