import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// Ensure we handle the MongoDB connection properly
let client: MongoClient;
async function connectToDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
  }
  return client.db("Cadogy");
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ message: "User created", userId: newUser.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred during sign-up" }),
      { status: 500 }
    );
  }
}
