
import AuthThemeProvider from "./components/auth-theme-provider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthThemeProvider>
      <div className="auth-layout min-h-svh bg-background-login text-foreground">
        {children}
      </div>
    </AuthThemeProvider>
  );
}
