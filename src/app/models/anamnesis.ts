export class Anamnesis {
  anamnesis_id: number;
  hipertencion: boolean = false;
  enfe_respiratorias: boolean = false;
  cardiopatias: boolean = false;
  sistema_digestivo: boolean = false;
  fiebre_reumatica: boolean = false;
  hepatitis: boolean = false;
  enfer_renales: boolean = false;
  enfer_gastrointestinales: boolean = false;
  quirurgico: boolean = false;
  traumatico: boolean = false;
  tratamiento_medico: boolean = false;
  toma_medicamento: boolean = false;
  alergia: boolean = false;
  embarazo: boolean = false;
  diabetes: boolean = false;
  neoplasias: boolean = false;
  enfer_hemorrogicas: boolean = false;
  nf_neurologicas: boolean = false;
  grupo_sangineo: string;
  rh: string;
  observaciones: string;
  odontologia_id: number;
}
