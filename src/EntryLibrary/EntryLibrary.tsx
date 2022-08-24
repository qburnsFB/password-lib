import {ForwardedRef, forwardRef, useState, FormEvent, ChangeEvent} from "react";
import classNames from "classnames";

type EntryLibraryType = {
    className?: string;
    handleSubmit: () => void;
}

type HandleInputType = ChangeEvent<HTMLInputElement>;
type FormType = FormEvent<HTMLFormElement>;

export const EntryLibrary = forwardRef(
    (
        {
            className,
            handleSubmit,
            ...rest
        }: EntryLibraryType,
        ref: ForwardedRef<HTMLFormElement> | undefined
    ) => {

        const [password, setPassword] = useState<string>("");
        const handleSetPassword = (e: HandleInputType) => setPassword(e.target.value);

        const [confirmPassword, setConfirmPassword] = useState<string>("");
        const handleSetConfirmPassword = (e: HandleInputType) => setConfirmPassword(e.target.value);

        const [errors, setErrors] = useState<string[]>([]);

        const validateSubmit = (event: FormType) => {
            event.preventDefault()
            const newErrors: string[] = [];
            const errorString = 'Your password must contain at least one ';

            if (password !== confirmPassword) {
                newErrors.push(`Your passwords must match each other`);
            } else if (password === confirmPassword) {
                if (password.length < 6) {
                    newErrors.push('Your password must be at least 6 characters long');
                }
                if(!/[a-z]/.test(password)) {
                    newErrors.push(`${errorString}lowercase letter`);
                }

                if(!/[A-Z]/.test(password)) {
                    newErrors.push(`${errorString}uppercase letter`);
                }

                if(!/[0-9]/.test(password)) {
                    newErrors.push(`${errorString}number`);
                }

                if(!/[!@#$%^&*()+={}|:;"'<,>.-]/.test(password)) {
                    newErrors.push(`${errorString}special character`);
                }
            }

            setErrors(newErrors);

            if (!newErrors.length) {
                return handleSubmit();
            }
        }


    return (
        <form className={classNames('entryLibrary', className)} ref={ref} {...rest} onSubmit={validateSubmit}>
            {errors.length ? <ul className="entryLibrary-errors">{errors.map(error => <li key={error}>{error}</li>)}</ul> : null}
            <label htmlFor="password-entryLibrary">Password:</label>
            <input name="password-entryLibrary" onChange={handleSetPassword} value={password} />
            <label htmlFor="confirmPassword-entryLibrary">Confirm Password:</label>
            <input name="confirmPassword-entryLibrary" onChange={handleSetConfirmPassword} value={confirmPassword} />
            <button type="submit">Submit</button>
        </form>
    )
});