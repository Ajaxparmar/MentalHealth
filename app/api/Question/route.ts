import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { question, optionA, optionB, optionC, optionD, correctOption,category,order } = await req.json();

    console.log( question, optionA, optionB, optionC, optionD, correctOption, category, order );
    try {
        const newQuestion = await prisma.question.create({
            data: {
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctOption,
                category,
                order
            },
        });
        return new Response(JSON.stringify({ message: "Question created successfully", question: newQuestion }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error creating question", error }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: Request) {
    try {
        const questions = await prisma.question.findMany();
        return new Response(JSON.stringify({ message: "Questions retrieved successfully", questions }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error retrieving questions", error }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}   