export interface transactionDataCompleteoperationalprogramResponse {
  operationalUnitResponseDto: {
    id_operativeunit : number ;
    name : string ;
    director : string ;
    phonenumber : string ;
    address : string ;
    codubi  : string ;
    status : string ;
  };

  teenResponseDto: {
    id_program : number ;
    name : string ;
    type : string ;
    beneficiary : string ;
    responsible : string ;
    description : string ;
    duration : string ;
    condition : string ;
  };

  transaccionalAllocation: {
    id_funcionaryteend: number;
    description: string;
    estado: string;
    id_operativeunit: number;
    id_program: number;
  };
}
