import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/useAuth";
import { RegisterRequest } from "@rick-morty-app/libs";
import {
  Container,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  ErrorMessage,
} from "@/components/styled/Common";

export const RegisterPage = () => {
  const register = useRegister();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit = (data: RegisterRequest) => {
    register.mutate(data);
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card style={{ width: "100%", maxWidth: "400px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Register for Rick & Morty App</h1>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                {...registerField("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...registerField("email", {
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
                {...registerField("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                {...registerField("role", {
                  required: "Role is required",
                })}
              >
                <option value="">Select a role</option>
                <option value="fan">Fan</option>
                <option value="product_owner">Product Owner</option>
              </Select>
              {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
            </FormGroup>

            {register.error && (
              <ErrorMessage>{(register.error as any)?.response?.data?.error || "Registration failed"}</ErrorMessage>
            )}

            <Button type="submit" disabled={register.isPending}>
              {register.isPending ? "Registering..." : "Register"}
            </Button>
          </Form>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <p>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
                Login here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
};
