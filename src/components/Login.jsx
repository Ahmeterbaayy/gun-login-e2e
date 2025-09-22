import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", terms: false });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validate(f) {
    const err = {};
    if (!emailRegex.test(f.email)) err.email = "Geçerli bir email giriniz.";
    if (!passwordRegex.test(f.password))
      err.password =
        "Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.";
    if (!f.terms) err.terms = "Şartları kabul etmelisiniz.";
    return err;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;
    setForm((f) => ({ ...f, [name]: val }));
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      navigate("/success");
    }
  }

  const currErrors = validate(form);

  return (
    <form onSubmit={handleSubmit} data-cy="login-form">
      <div>
        <label>
          Email:
          <input
            data-cy="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        {touched.email && currErrors.email && (
          <div data-cy="error-email" style={{ color: "red" }}>
            {currErrors.email}
          </div>
        )}
      </div>
      <div>
        <label>
          Şifre:
          <input
            data-cy="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        {touched.password && currErrors.password && (
          <div data-cy="error-password" style={{ color: "red" }}>
            {currErrors.password}
          </div>
        )}
      </div>
      <div>
        <label>
          <input
            data-cy="terms"
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Şartları kabul ediyorum
        </label>
        {touched.terms && currErrors.terms && (
          <div data-cy="error-terms" style={{ color: "red" }}>
            {currErrors.terms}
          </div>
        )}
      </div>
      <button
        data-cy="submit"
        type="submit"
        disabled={Object.keys(currErrors).length > 0}
      >
        Giriş Yap
      </button>
    </form>
  );
}