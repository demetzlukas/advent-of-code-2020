export class Passport {
    private static FIELDS = [
        'byr', // (Birth Year)
        'iyr', // (Issue Year)
        'eyr', // (Expiration Year)
        'hgt', // (Height)
        'hcl', // (Hair Color)
        'ecl', // (Eye Color)
        'pid', // (Passport ID)
        'cid', // (Country ID)
    ];
    private birthYear: number;
    private issueYear: number;
    private expirationYear: number;
    private height: string;
    private hairColor: string;
    private eyeColor: string;
    private passportID: string;
    private countryID: string;

    constructor() {}

    public static createFromString(pairs: string[]): Passport {
        let passport = new Passport();

        for (const pair of pairs) {
            const [key, value] = pair.split(':');

            switch (key) {
                case 'byr':
                    passport.birthYear = parseInt(value);
                    break;
                case 'iyr':
                    passport.issueYear = parseInt(value);
                    break;
                case 'eyr':
                    passport.expirationYear = parseInt(value);
                    break;
                case 'hgt':
                    passport.height = value;
                    break;
                case 'hcl':
                    passport.hairColor = value;
                    break;
                case 'ecl':
                    passport.eyeColor = value;
                    break;
                case 'pid':
                    passport.passportID = value;
                    break;
                case 'cid':
                    passport.countryID = value;
                    break;

                default:
                    throw new Error('Unknown key');
            }
        }

        return passport;
    }

    public isValueValid(key: string): boolean {
        switch (key) {
            case 'byr':
                return this.birthYear >= 1920 && this.birthYear <= 2002;
            case 'iyr':
                return this.issueYear >= 2010 && this.issueYear <= 2020;
            case 'eyr':
                return (
                    this.expirationYear >= 2020 && this.expirationYear <= 2030
                );
            case 'hgt':
                if (!this.height) return false;
                const parts = this.height.match(/(\d+)(cm|in)/);
                if (parts == null) return false;
                const [_, height, unit] = parts;
                let heightAsInt = parseInt(height);
                if (unit === 'cm')
                    return heightAsInt >= 150 && heightAsInt <= 193;
                return heightAsInt >= 59 && heightAsInt <= 76;
            case 'hcl':
                return (
                    this.hairColor &&
                    this.hairColor.match(/^#[0-9a-f]{6}$/) != null
                );
            case 'ecl':
                return [
                    'amb',
                    'blu',
                    'brn',
                    'gry',
                    'grn',
                    'hzl',
                    'oth',
                ].includes(this.eyeColor);
            case 'pid':
                return (
                    this.passportID && this.passportID.match(/^\d{9}$/) != null
                );
            case 'cid':
                return true;
            default:
                throw new Error('Unknown key');
        }
    }

    public isValid(checkValues: boolean = false): boolean {
        if (!checkValues) {
            for (const key of Passport.FIELDS) {
                if (key === 'cid') continue;
                if (this.getValue(key) === undefined) return false;
            }
            return true;
        }

        for (const key of Passport.FIELDS) {
            if (!this.isValueValid(key)) return false;
        }
        return true;
    }

    public getValue(key: string): number | string {
        switch (key) {
            case 'byr':
                return this.birthYear;
            case 'iyr':
                return this.issueYear;
            case 'eyr':
                return this.expirationYear;
            case 'hgt':
                return this.height;
            case 'hcl':
                return this.hairColor;
            case 'ecl':
                return this.eyeColor;
            case 'pid':
                return this.passportID;
            case 'cid':
                return this.countryID;
            default:
                throw new Error('Unknown key');
        }
    }
}
