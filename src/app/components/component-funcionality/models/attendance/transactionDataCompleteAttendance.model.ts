export interface AttendancetransactionDataComplete {
    ActivitiesResponseDto: {
        id_activities: number;
        name: string;
        description: string;
        date: Date;
        duration: string;
        location: string;
        active: string;
        type_pronacej: string;
        type_soa: string;
        id_program : number;
    };

    AttendanceResponseDto: {
        id_attemdance: number;
        idactiviti: number;
        idadolescente: number;
        asistencia: string;
        active: string;
    };

    TeenResponseDto: {
        id_teen: number;
        name: string;
        surnameFather: string;
        surnameMother: string;
        dni: string;
        phoneNumber: string;
        address: string;
        email: string;
        birthade: Date;
        gender: string;
        id_operativeunit: number;
        crimeCommitted: string;
        id_attorney: number;
        codubi: string;
        status: string;
    };

    TransaccionalActTeen: {
        id_act_teen: number;
        id_activities: number;
        id_teenager: number;
        id_attemdance: number;
        start_date: Date;
        duration: string;
        notes: string;
        participation_status: string;
        active: string;
    };
}
