import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: "Error registering user", error }), { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }

    return new Response(JSON.stringify({ message: "User registered successfully" }))

}