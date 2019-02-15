export class Option { constructor() {}
    Id: number;
    Name: string;
    Description: string;
    Color: string;
    Photo: string;
}

export class Envelope { constructor() {}
    Id: number;
    Key: string;
    Content: string;
    IdVotingProcess: number;
    VotingProcess: VotingProcess;
}

export class VotingProcessOption { constructor() {}
    Id: number;
    IdVotingProcess: number;
    VotingProcess: VotingProcess;
    IdOption: number;
    Option: Option;
}

export class VotingProcess { constructor() {}
    Id: number;
    Guid: string;
    Name: string;
    Public: boolean;
    ClosingDate: Date;
    OpeningDate: Date;
    Description: string;
    NbVotes: number;
    Author: string;
    AuthorMail: string;
    PublicKey: string;
    MyPrivateKey: string;

    IdVotingProcessMode: number;
    VotingProcessMode: VotingProcessMode;
    IdPreviousVotingProcess: number;
    PreviousVotingProcess: VotingProcess;
    IdUser: string;
    User: User;

    Voter: Voter[];
    VotingProcessOption: VotingProcessOption[];

    get options(): Option[] {
        return this.VotingProcessOption.map(os => os.Option);
    }
    set options(opts: Option[]) {
        this.VotingProcessOption = opts.map(op => {
            const os = new VotingProcessOption();
            os.IdOption = op.Id;
            os.Option = op;
            os.IdVotingProcess = this.Id;
            return os;
        });
    }
}

export class Voter { constructor() {}
    Id: number;
    Mail: string;
    Token: string;
    IdVotingProcess: number;
    VotingProcess: VotingProcess;
    HasVoted: boolean;
}

export class VotingProcessMode {
    Id: number;
    Name: string;
    Code: string;
    Description: string;
    Numeric: boolean;

    VotingProcess: VotingProcess[];
    Choice: Choice[];
}

export class Choice {
    Id: number;
    Name: string; // nom du choice ( = exelent dans le cas d'un mode de scrutin majoritaire)
    Value: number; // détermine l'importance du choice (0 = null 7 = très bien dans le cas d'un mode de scrutin majoritaire)
    IdVotingProcessMode: number;
    VotingProcessMode: VotingProcessMode;
}

export abstract class Vote {
    IdVotingProcess: number;
    IdVoter: number;

    protected _type: string;

    constructor(votingProcess: VotingProcess) {
        this.IdVotingProcess = votingProcess.Id;
    }

    public abstract getEssential(): Vote;
}

export class MajoritaryVotingProcessVote extends Vote {
    IdOption: number;

    constructor(votingProcess: VotingProcess, option: Option) {
        super(votingProcess);
        this.IdOption = option.Id;
        this._type = 'MajoritaryVotingProcessVote';
    }

    public getEssential() {
        return this;
    }
}

export class MajoritaryJudgmentVote extends Vote {
    OptionChoice: OptionChoice[];

    constructor(scrutin: VotingProcess, optionChoice: OptionChoice[]) {
        super(scrutin);
        this.OptionChoice = optionChoice;
        this._type = 'MajoritaryJudgmentVote';
    }

    public getEssential() {
        const newVote = Object.assign({}, this);
        newVote.OptionChoice = this.OptionChoice.map(oc => {
            const newoc = Object.assign({}, oc);
            newoc.Choice = null;
            return newoc;
        });
        return newVote;
    }
}

export class AlternativeVote extends Vote {
    Ranking: Option[];

    constructor(votingProcess: VotingProcess, propositions: Option[]) {
        super(votingProcess);
        this.Ranking = propositions;
        this._type = 'AlternativeVote';
    }

    public getEssential() {
        return this;
    }
}

export class OptionChoice {
    IdOption: number;
    IdChoice: number;
    Choice: Choice;

    constructor(optionId: number, choiceId: number) {
        this.IdOption = optionId;
        this.IdChoice = choiceId;
    }
}

export class User {
    Id: string;
    UserName: string;
    Email: string;
}

// View models
export class RegisterViewModel {
    Email: string;
    UserName: string;
    Password: string;
}

export class ResetPasswordViewModel {
    constructor() {
    }
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Code: string;
}

export class AuthViewModel {
    UserName: string;
    Password: string;
}

export class AuthToken {
    requestAt: Date;
    expiresIn: number;
    tokenType: string;
    accessToken: string;
}

export class EnvelopeViewModel {
    IdElecteur: number;
    Token: string;
    Envelope: Envelope;
}

// Classes spécifiques calculs des résultats
export class OptionsModel {
    Id: number;
    Name: string;
    IsBlankVote: boolean;
}
export class ChoiceModel {
    Id: number;
    Name: string;
    Value: number;
}
export class ScoreModel {
    Choices: ChoiceModel;
    Votes: number;
    Percentage: number;
}

// Resultat scrutin classique
export interface IResultatModel {
    Id: number;
    Voters: number;
    IsValidResult: boolean;
    Winner: OptionsModel;
    IdNewVotingProcess: number;
}

export class ResultatModelBase<TResultatIndividuel> implements IResultatModel {
    Id: number;
    Voters: number;
    IsValidResult: boolean;
    Winner: OptionsModel;
    IdNewVotingProcess: number;
    IndividualResults: TResultatIndividuel[];
    Options: OptionsModel[];
}

export class ResultatMajoritaryJudgment extends ResultatModelBase<ResultatIndividualMajorityJudgment> {

}

export class ResultatMajorityVotingProcess extends ResultatModelBase<ResultatIndividuelScrutinMajoritaire> {
    PreviousRoundResultat: ResultatMajorityVotingProcess;
}

export class ResultatIndividuelModelBase {
    Option: OptionsModel;
}

export class ResultatIndividualMajorityJudgment extends ResultatIndividuelModelBase {
    Scores: ScoreModel[];
    PercentageScoreSupMedian: number;
    PercentageScoreInfMedian: number;
    Median: ChoiceModel;
}

export class ResultatIndividuelScrutinMajoritaire extends ResultatIndividuelModelBase {
    Votes: number;
    Pourcentage: number;
}

// Resultat vote alternatif
export class AlternativeVoteResultat implements IResultatModel {
    Id: number;
    IsValidResult: boolean;
    Winner: OptionsModel;
    IdNewVotingProcess: number;
    Stages: AlternativeStageVote[];
    Options: OptionsModel[];
    Voters: number;
}

export class AlternativeStageVote {
    RemovedOption: OptionsModel;
    Scores: AlternativeScoreVote[];
}

export class AlternativeScoreVote {
    Option: OptionsModel;
    Votes: number;
}

// Data format for ngx charts
export class ngxItem {
    name: string;
    series: ngxScore[];
}
export class ngxScore {
    name: string;
    value: number;
}

export interface IAppConfig {
    rootPath: string;
    serverPath: string;
    defaultLang: string;
    authorizedLanguages: Array<string>;
}
