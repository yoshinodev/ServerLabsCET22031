const userMessages = {
    "en": {
        ERR_ENROLLING: "We were unable to proceed with the enrollment.",
        ERR_UNSPECIFIED_TOURNAMENT: "We're sorry but there was a problem with the enrolling data.",
        ERR_PLAYER_ALREADY_ENROLLED: "Player already enrolled at the tournament.",
        ERR_UNKNOWN_TOURNAMENT_ID: "We're sorry but there was a problem with the enrolling data.",
        SUCCESS_ENROLLING: "Player successfully enrolled.",
        PLAYER: "Player",
        EMAIL_ADDR: "Email address",
        HOME_NAV: "Home",
        CREATE_TOURNAMENT_NAV: "Create Tournaments",
        TOURNAMENT_NAME: "Spring Tournament",
        TOURNAMENT_PRIZES: "Prizes up to 10th place",
        RULES: "Regulation",
        MEMBERS: "Members",
        ENROLL_HERE: "Register for tournament here",
        SELECT_TOURNAMENT: "Select a tournament",
        EASTER_TOURNAMENT: "Easter Tournament",
        FRIENDSHIP_TOURNAMENT: "Friendship Tournament",
        SPRING_TOURNAMENT: "Spring Tournament",
        FULL_NAME_LABEL: "Full name",
        EMAIL_ADDR_LABEL: "Email",
        PHONE_NUMBER_LABEL: "Phone number",
        BIRTH_DATE_LABEL: "Birth date (DD/MM/YYYY)",
        PASSWORD_LABEL: "Password",
        REPEAT_PASSWORD_LABEL: "Password again",
        PLAYER_LEVEL_LABEL: "Level",
        DATE_FMT: "(MM/DD/YYYY)",
        PRIVACY_POLICY_MSG: "I read and I agree with the",
        PRIVACY_POLICY: "Privacy Policy",
        BEGINNER_LEVEL: "Beginner",
        INTERMEDIATE_LEVEL: "Intermediate",
        ADVANCED_LEVEL: "Advanced",
        PRE_PRO_LEVEL: "Pre-professional",
        PRO_LEVEL: "Professional",
        SUBMIT_BTN: "Submit",
        RESET_BTN: "Reset",
        // START OF NEW TOURNAMENTS PAGE TRANSLATIONS
        CREATE_TOURNAMENT_TITLE: "Create a new tournament",
        TOURNAMENT_NAME_LABEL: "Tournament name",
        TOURNAMENT_LOCATION: "Tournament location",
        TOURNAMENT_START_DATE: "Tournament start date",
        TOURNAMENT_END_DATE: "Expected end date",
        PARTICIPANTS_CAPACITY: "Participants capacity",
        TO_BE_DEFINED_OPTION: "To be defined",
        UNLIMITED_OPTION: "Unlimited",
        PRIVACY_POLICY_MSG2: "I read and I agree with the",
        PRIVACY_POLICY2: "Privacy Policy",
        SUBMIT_BTN2: "Submit",
        RESET_BTN2: "Reset",
    },
    "pt": {
        ERR_ENROLLING: "Não foi possível concluir a inscrição.",
        ERR_UNSPECIFIED_TOURNAMENT: "Ooops...detectámos um problema com os dados de inscrição.",
        ERR_PLAYER_ALREADY_ENROLLED: "O jogador já se encontra inscrito no torneio.",
        ERR_UNKNOWN_TOURNAMENT_ID: "Ooops...torneio desconhecido.",
        SUCCESS_ENROLLING: "Jogador inscrito com sucesso.",
        PLAYER: "Jogador",
        EMAIL_ADDR: "Endereço de email",
        HOME_NAV: "Início",
        CREATE_TOURNAMENT_NAV: "Criar Torneios",
        TOURNAMENT_NAME: "Torneio da Primavera",
        TOURNAMENT_PRIZES: "Prémios até ao 10&#x2070; lugar",
        RULES: "Regulamento",
        MEMBERS: "Membros",
        ENROLL_HERE: "Inscreva-se aqui",
        SELECT_TOURNAMENT: "Selecione um torneio",
        EASTER_TOURNAMENT: "Torneio da Páscoa",
        FRIENDSHIP_TOURNAMENT: "Torneio da Amizade",
        SPRING_TOURNAMENT: "Torneio da Primavera",
        FULL_NAME_LABEL: "Nome completo",
        EMAIL_ADDR_LABEL: "Email",
        PHONE_NUMBER_LABEL: "Telefone",
        BIRTH_DATE_LABEL: "Data de nascimento",
        PASSWORD_LABEL: "Senha",
        REPEAT_PASSWORD_LABEL: "Senha de novo",
        PLAYER_LEVEL_LABEL: "Nível",
        DATE_FMT: "(DD/MM/AAAA)",
        PRIVACY_POLICY_MSG: "Li e concordo com a",
        PRIVACY_POLICY: "Política de Privacidade",
        BEGINNER_LEVEL: "Iniciado",
        INTERMEDIATE_LEVEL: "Intermédio",
        ADVANCED_LEVEL: "Avançado",
        PRE_PRO_LEVEL: "Pré-profissional",
        PRO_LEVEL: "Profissional",
        SUBMIT_BTN: "Submeter",
        RESET_BTN: "Limpar",
        // START OF NEW TOURNAMENTS PAGE TRANSLATIONS
        CREATE_TOURNAMENT_TITLE: "Crie o seu torneio",
        TOURNAMENT_NAME_LABEL: "Nome do torneio",
        TOURNAMENT_LOCATION: "Localização do torneio",
        TOURNAMENT_START_DATE: "Data de início prevista",
        TOURNAMENT_END_DATE: "Data de fim prevista",
        PARTICIPANTS_CAPACITY: "Capacidade de participantes",
        TO_BE_DEFINED_OPTION: "A definir",
        UNLIMITED_OPTION: "Ilimitado",
        PRIVACY_POLICY_MSG2: "Li e concordo com a",
        PRIVACY_POLICY2: "Política de Privacidade",
        SUBMIT_BTN2: "Submeter",
        RESET_BTN2: "Limpar",
    },
};

class UnknownMessageID extends Error {
    constructor(messageID) {
        super(`Unknown message ID: ${messageID}`);
    }
}

class UnknownLanguage extends Error {
    constructor() {
        super(`Unknown language: ${currentLanguage}`);
    }
}

function setCurrentLanguage(newCurrentLanguage) {
    if (userMessages[newCurrentLanguage] === undefined) {
        throw new UnknownLanguage();
    }
    currentLanguage = newCurrentLanguage;

}

function tr(messageID) {
    if (userMessages[currentLanguage] === undefined) {
        throw new UnknownLanguage();
    }
    if (userMessages[currentLanguage][messageID] === undefined) {
        throw new UnknownMessageID();
    }
    return userMessages[currentLanguage][messageID];

}

document.addEventListener("DOMContentLoaded", () => {
    
  });
  // add event listener for the english language button
document.getElementById("engBtn").addEventListener("click", () => {
    setCurrentLanguage("en");
     document.querySelectorAll("[data-key]").forEach(translateElement);
});

// add event listener for the portuguese language button
document.getElementById("ptBtn").addEventListener("click", () => {
    setCurrentLanguage("pt");
    document.querySelectorAll("[data-key]").forEach(translateElement);
});

// Replace the inner text of the given HTML element
// with the translation in the current language,
// corresponding to the element's data-key
function translateElement(element) {
    const key = element.getAttribute("data-key");
    const translation = userMessages[currentLanguage][key];
    element.innerText = translation;
  }
