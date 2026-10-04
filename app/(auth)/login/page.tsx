"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth, ApiError } from "@/lib/auth-context"
import { resolveLoginRedirect } from "@/lib/resolve-login-redirect"
import { cn } from "@/lib/utils"
import { BRAND_MONOGRAM, BRAND_NAME } from "@/lib/brand"
import { toast } from "sonner"
import { Crown, Shield, BookOpen, GraduationCap, type LucideIcon } from "lucide-react"

const REMEMBER_KEY = "phynix:remember-email"

const DEMO_ACCOUNTS: {
  key: string
  label: string
  email: string
  password: string
  icon: LucideIcon
}[] = [
  { key: "super-admin", label: "Super Admin", email: "s-admin@gmail.com", password: "Asdfghjk", icon: Crown },
  { key: "admin", label: "Admin", email: "admin@gmail.com", password: "Asdfghjk", icon: Shield },
  { key: "instructor", label: "Instructor", email: "instructor@gmail.com", password: "Asdfghjk", icon: BookOpen },
  { key: "student", label: "Student", email: "hasiv@gmail.com", password: "Asdfghjk", icon: GraduationCap },
]

const schema = z.object({
  email: z.string().trim().email("Valid email required"),
  password: z.string().trim().min(1, "Password required"),
})

type FormData = z.infer<typeof schema>

function LoginContent() {
  const { login, user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"
  const [error, setError] = useState<string | null>(null)
  const [deviceLimit, setDeviceLimit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState<FormData | null>(null)
  const [remember, setRemember] = useState(false)
  const [demoLoading, setDemoLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(resolveLoginRedirect(user.role, redirect))
    }
  }, [authLoading, user, router, redirect])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  // Restore remembered email
  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY)
      if (saved) {
        setValue("email", saved)
        setRemember(true)
      }
    } catch {
      // storage unavailable
    }
  }, [setValue])

  const persistRemember = (email: string) => {
    try {
      if (remember) localStorage.setItem(REMEMBER_KEY, email)
      else localStorage.removeItem(REMEMBER_KEY)
    } catch {
      // ignore
    }
  }

  const handleDemoLogin = async (account: (typeof DEMO_ACCOUNTS)[number]) => {
    // Fill the form so the user sees what is being used
    setValue("email", account.email)
    setValue("password", account.password)
    setDemoLoading(account.key)
    setLoading(true)
    setError(null)
    setDeviceLimit(false)
    setCredentials({ email: account.email, password: account.password })
    try {
      const loggedInUser = await login(account.email, account.password)
      toast.success(`Signed in as ${account.label}`)
      router.push(resolveLoginRedirect(loggedInUser.role, redirect))
    } catch (err) {
      if (err instanceof ApiError && err.code === "DEVICE_LIMIT_REACHED") {
        setDeviceLimit(true)
        setError("Another device is already logged in. Force logout to continue.")
      } else {
        setError(err instanceof ApiError ? err.message : "Login failed")
      }
    } finally {
      setLoading(false)
      setDemoLoading(null)
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    setDeviceLimit(false)
    setCredentials(data)
    try {
      const loggedInUser = await login(data.email, data.password)
      persistRemember(data.email)
      toast.success("Sign in!")
      router.push(resolveLoginRedirect(loggedInUser.role, redirect))
    } catch (err) {
      if (err instanceof ApiError && err.code === "DEVICE_LIMIT_REACHED") {
        setDeviceLimit(true)
        setError("Another device is already logged in. Force logout to continue.")
      } else {
        setError(err instanceof ApiError ? err.message : "Login failed")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleForceLogout = async () => {
    if (!credentials) return
    setLoading(true)
    setError(null)
    try {
      const loggedInUser = await login(credentials.email, credentials.password, {
        forceLogout: true,
      })
      toast.success("Sign in!")
      router.push(resolveLoginRedirect(loggedInUser.role, redirect))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed")
    } finally {
      setLoading(false)
      setDeviceLimit(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className={cn("w-full max-w-md rounded-[20px] bg-card p-8 shadow-sm")}>
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">{BRAND_MONOGRAM}</span>
            </div>
            <span className="text-xl font-bold text-foreground">{BRAND_NAME}</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your email and password.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              className="mt-1 rounded-xl"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1 rounded-xl"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="remember" className="flex items-center gap-2 text-foreground">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="font-medium text-muted-foreground hover:text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full rounded-xl" disabled={loading}>
            {loading && !demoLoading ? "Signing in..." : "Continue"}
          </Button>
        </form>

        <div className="mt-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Quick demo accounts
          </p>
          <div className="grid grid-cols-2 gap-3">
            {DEMO_ACCOUNTS.map((account) => {
              const Icon = account.icon
              const isActive = demoLoading === account.key
              return (
                <button
                  key={account.key}
                  type="button"
                  disabled={loading}
                  onClick={() => handleDemoLogin(account)}
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Icon className="size-5" />
                  {isActive ? "Signing in..." : account.label}
                </button>
              )
            })}
          </div>
        </div>

        {deviceLimit && (
          <Button
            variant="outline"
            className="mt-3 w-full rounded-xl"
            onClick={handleForceLogout}
            disabled={loading}
          >
            Force Logout Other Devices
          </Button>
        )}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
