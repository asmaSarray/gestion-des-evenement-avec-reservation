export class Evenement {
  _id?: string;

  titre: String;
  description: String;
  date: Date;
  lieu: String;
  capacite: Number;
  price: Number;
  // image: [
  //   {
  //     // public_id: {
  //     //   type: String;
  //     // };
  //     img: {
  //       type: String;
  //     };
  //   }
  // ];
  image: {
    path: String;
  };
  category: String;
  visibility: Boolean;

  constructor(evenement: any) {
    this._id = evenement?._id;
    this.titre = evenement?.titre || '';
    this.description = evenement?.description || '';
    this.date = evenement?.date || '';
    this.lieu = evenement?.lieu || 0;
    this.capacite = evenement?.capacite || '';
    this.price = evenement?.price || '';
    this.image = evenement?.image || { public_id: '', url: '' };
    this.category = evenement?.category || '';
    this.visibility = evenement?.visibility || false;
  }
}
export interface ReponseList {
  MESSAGE: string;
  OK: Boolean;

  RESULTAT: any;
}
