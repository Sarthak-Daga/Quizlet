'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import StudentDashboard from "./studentDashboard/page"
import TeacherDashboard from "./teacherDashboard/page"

interface User {
    name: string
    role: "teacher" | "student"
}

export default function Home() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getUserAndRole = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser()

            if (error || !user) {
                router.push("/login")
                return
            }

            // Fetch role from 'users' table
            const { data, error: roleError } = await supabase
                .from("users")
                .select("name, role")
                .eq("id", user.id)
                .single()

            if (roleError || !data) {
                console.error("Role fetch error:", roleError)
                router.push("/login")
                return
            }

            setUser(data)
        }

        getUserAndRole()
    }, [router])

    if (!user) return <p className="text-center mt-10">Loading...</p>

    return <div>{user.role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}</div>
}
