"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Code, Copy, ExternalLink, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

const API_ENDPOINTS = [
  {
    title: "Authentication",
    description: "Learn how to authenticate with the API",
    href: "#authentication",
    icon: BookOpen,
  },
  {
    title: "Rate Limiting",
    description: "Understand the API rate limits",
    href: "#rate-limiting",
    icon: BookOpen,
  },
  {
    title: "Text-to-Speech",
    description: "Convert text to natural-sounding speech",
    href: "#text-to-speech",
    icon: BookOpen,
  },
  {
    title: "Speech-to-Text",
    description: "Convert spoken words to text",
    href: "#speech-to-text",
    icon: BookOpen,
  },
]

const CODE_EXAMPLES = {
  node: `const fetch = require('node-fetch');

const API_KEY = 'your_api_key_here';
const text = 'Hello, this is a text to speech conversion example';

async function textToSpeech() {
  const response = await fetch('https://api.cadogy.com/v1/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${API_KEY}\`
    },
    body: JSON.stringify({
      text,
      voice: 'en-US-Neural2-F',
      format: 'mp3'
    })
  });

  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }

  const data = await response.json();
  return data.audio_url;
}

textToSpeech()
  .then(url => console.log('Audio URL:', url))
  .catch(error => console.error('Error:', error));`,
  python: `import requests

API_KEY = 'your_api_key_here'
text = 'Hello, this is a text to speech conversion example'

def text_to_speech():
    response = requests.post(
        'https://api.cadogy.com/v1/tts',
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {API_KEY}'
        },
        json={
            'text': text,
            'voice': 'en-US-Neural2-F',
            'format': 'mp3'
        }
    )

    if response.status_code != 200:
        raise Exception(f'API error: {response.status_code}')

    data = response.json()
    return data['audio_url']

try:
    url = text_to_speech()
    print(f'Audio URL: {url}')
except Exception as e:
    print(f'Error: {e}')`,
  curl: `curl -X POST https://api.cadogy.com/v1/tts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -d '{
    "text": "Hello, this is a text to speech conversion example",
    "voice": "en-US-Neural2-F",
    "format": "mp3"
  }'`,
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("node")

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code copied",
      description: "The code snippet has been copied to your clipboard.",
    })
  }

  // Filter endpoints based on search query
  const filteredEndpoints = API_ENDPOINTS.filter(
    (endpoint) =>
      endpoint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            API Documentation
          </h1>
          <p className="text-muted-foreground">
            Comprehensive guides and examples to help you integrate with our
            API.
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredEndpoints.map((endpoint) => (
          <Card
            key={endpoint.href}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <endpoint.icon className="h-8 w-8 text-primary" />
              <div className="space-y-1">
                <CardTitle>{endpoint.title}</CardTitle>
                <CardDescription>{endpoint.description}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Link href={endpoint.href} className="w-full">
                <Button variant="secondary" className="w-full justify-between">
                  Read Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
          <CardDescription>
            Get started with our API in minutes using the examples below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="node"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="node">Node.js</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            {Object.entries(CODE_EXAMPLES).map(([lang, code]) => (
              <TabsContent key={lang} value={lang}>
                <div className="relative mt-4 rounded-md bg-secondary/50 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopyCode(code)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy code</span>
                  </Button>
                  <pre className="overflow-x-auto text-sm">
                    <code className={cn("language-" + lang)}>{code}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">
            Replace &apos;your_api_key_here&apos; with your actual API key.
          </p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/api-keys">
              Get API Key
              <Code className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
