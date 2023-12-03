import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {useAuthServiceContext} from "../context/AuthServiceProvider.tsx";
import {Box, Button, Container, TextField, Typography} from "@mui/material";


const Login = () => {
    const navigate = useNavigate()
    const authService = useAuthServiceContext()
    const formik = useFormik({
            initialValues: {
                username: "",
                password: "",
                resultError: "",
            },
            validate: (values) => {
                const errors: Partial<typeof values> = {}
                if (!values.username) {
                    errors.username = "Required"
                }
                if (!values.password) {
                    errors.password = "Required"
                }
                return errors
            },
            onSubmit: async (values) => {
                const res = await authService.login(values.username, values.password)
                if (res === 401) {
                    formik.errors.resultError = "Invalid username or password"
                    return
                }
                navigate("/test")

            }

        },
    )


    return (
        <Container component={"main"} maxWidth={"xs"} sx={{height: "100vh"}}>

            <Box sx={{
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100dvh"
            }}>


                <Typography
                    variant={"h3"}
                    noWrap
                    component={"h1"}
                    sx={{
                        pb: 4,
                        fontWeight: 500
                    }}

                >
                    Login
                </Typography>
                <Box
                    component={"form"}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                    onSubmit={formik.handleSubmit}>
                    <TextField
                        autoFocus={true}
                        name={"username"}
                        autoComplete={"username"}
                        placeholder={"Username"}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        sx={{pb: 2}}
                        label={"Username"}
                        error={!!formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        type={"password"}
                        name={"password"}
                        label={"Password"}
                        autoComplete={"current-password"}
                        placeholder={"Password"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        sx={{pb: 4}}
                        error={!!formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button variant={"contained"} sx={{mb: 4}} type={"submit"}>Login</Button>
                </Box>

                <Box color={"red"}>{formik.errors.resultError}</Box>

            </Box>


        </Container>
    );
};

export default Login;