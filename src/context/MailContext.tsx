import React from 'react';

interface IMailProp {
    subject: string;
    body: string;
    salutation: string;
    ending: string;
}

export interface IEmail {
    setMail: (mail: IMailProp) => void;
    mail: IMailProp;
}

interface Props {
    children: React.ReactNode
};

//Context 
export const MailContext = React.createContext<IEmail | undefined>(undefined);

//Provider
export const MailProvider = ({ children }: Props) => {
    const [mail, setMail] = React.useState<IMailProp>({
        subject: " ",
        body: " ",
        salutation: " ",
        ending: " "
    });
    return (<MailContext.Provider value={{ mail, setMail }}>
        {children}
    </MailContext.Provider>)
}

