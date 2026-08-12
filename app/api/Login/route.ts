import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: "Invalid password" }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: "Login successful" }));
}