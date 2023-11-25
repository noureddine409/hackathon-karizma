export const ERROR_MESSAGES = {
    required: 'This field is required.',
    minLength: 'Please enter at least {min} characters.',
    maxLength: 'Please enter at most {max} characters.',
    pattern: 'Invalid input.',
    email: 'Invalid email address.',
    name: 'Invalid name',
    username: 'Invalid username',
    password: 'Invalid password. Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit.',
    passwordMatch: 'Passwords do not match.',
};
export const VALIDATION_RULES = {
    minLength: (min: number) => (v: string) => v.length >= min,
    maxLength: (max: number) => (v: string) => v.length <= max,
    namePattern: /^[a-zA-Z0-9_]+$/,
    emailPattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export const DEFAULT_SEARCH_KEYWORD = ""
export const DEFAULT_PAGE_NUMBER = 1
export const DEFAULT_PAGE_SIZE = 6
export const DEFAULT_TOTAL_PAGES = 10


