import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useAuth";
import { LoginRequest } from "@rick-morty-app/libs";
import { Container, Card, Form, FormGroup, Label, Input, Button, ErrorMessage } from "@/components/styled/Common";

export const LoginPage = () => {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = (data: LoginRequest) => {
    login.mutate(data);
  };

  return (
    <Container>
      <div className="auth-container">
        <Card className="auth-card">
          <h1 className="auth-title">Login to Rick & Morty App</h1>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </FormGroup>

            {login.error && (
              <ErrorMessage>{(login.error as any)?.response?.data?.error || "Login failed"}</ErrorMessage>
            )}

            <Button type="submit" disabled={login.isPending}>
              {login.isPending ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
};
