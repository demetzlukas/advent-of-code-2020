export class Passport {
    private static FIELDS: {
        key: string;
        validation: (value: string) => boolean;
    }[] = [
        {
            key: 'byr',
            validation: (value: string) =>
                /(19[2-9][0-9])|200[0-2]/.test(value),
        },
        {
            key: 'iyr',
            validation: (value: string) => /20(1[0-9]|20)/.test(value),
        },
        {
            key: 'eyr',
            validation: (value: string) => /20(2[0-9]|30)/.test(value),
        },
        {
            key: 'hgt',
            validation: (value: string) =>
                /^((((59)|(6[0-9])|(7[0-6]))in)|(1((([5-8])[0-9]|(9[0-3])))cm))$/.test(
                    value
                ),
        },
        {
            key: 'hcl',
            validation: (value: string) => /^#[0-9a-f]{6}$/.test(value),
        },
        {
            key: 'ecl',
            validation: (value: string) =>
                ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(
                    value
                ),
        },
        { key: 'pid', validation: (value: string) => /^\d{9}$/.test(value) },
        { key: 'cid', validation: (value: string) => true },
    ];

    private property: Map<string, string>;

    constructor() {
        this.property = new Map();
    }

    public static createFromString(pairs: string[]): Passport {
        let passport = new Passport();

        pairs.forEach(pair => {
            const [key, value] = pair.split(':');
            passport.property.set(key, value);
        });

        return passport;
    }

    public isValid(checkValues: boolean = false): boolean {
        if (!checkValues) {
            for (const field of Passport.FIELDS) {
                if (field.key === 'cid') continue;
                if (!this.property.get(field.key)) return false;
            }
            return true;
        }

        for (const field of Passport.FIELDS) {
            if (!field.validation(this.property.get(field.key))) return false;
        }
        return true;
    }
}
