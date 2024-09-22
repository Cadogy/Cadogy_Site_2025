import React from "react"
import Link from "next/link"

// Define the shape of an Article
interface Article {
  title: string
  date: string
  description: string
  coverImage: string
  slug: string
}

interface ArticlesHeroProps {
  articles: Article[] // Define articles as an array of Article objects
}

const ArticlesHero: React.FC<ArticlesHeroProps> = ({ articles }) => {
  return (
    <div className="flex justify-center px-4">
      {" "}
      {/* Added padding for mobile */}
      <div className="w-full max-w-[68rem]">
        <div className="mb-[3.5rem] mt-[5rem] flex flex-col items-center">
          <h2 className="text-[14px] md:text-[18px]">News</h2>{" "}
          {/* Responsive text */}
          <h1 className="text-[32px] md:text-[50px]">Articles</h1>{" "}
          {/* Responsive text */}
        </div>
        <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
          {/* Article 1 */}
          <div className="slide1 group relative w-full overflow-hidden rounded-[6px] hover:cursor-pointer md:w-2/3">
            {/* Background Image Zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${articles[0].coverImage})` }}
            ></div>
            {/* Darkening Overlay & Text */}
            <div className="relative flex h-full min-h-[20rem] flex-col items-start justify-end bg-black/20 p-4 text-white transition-colors duration-300 group-hover:bg-black/40 md:min-h-[30rem]">
              <div className="translate-y-[50px] transform transition-all duration-300 group-hover:translate-y-[-10px]">
                <h2 className="line-clamp-2 text-2xl text-slate-50 md:text-4xl">
                  {articles[0].title}
                </h2>
                <p className="max-w-lg text-sm text-slate-50 md:text-base">
                  {articles[0].date}
                </p>
              </div>
              <p className="description hidden max-w-lg translate-y-4 transform text-sm text-slate-50 opacity-0 blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none md:flex md:text-base">
                {articles[0].description}
              </p>
            </div>
            {/* Absolute positioned Link to make the whole div clickable */}
            <Link
              href={articles[0].slug}
              className="absolute inset-0 z-10"
              aria-label={articles[0].title}
            ></Link>
          </div>

          {/* Article 2 and Article 3 */}
          <div className="flex w-full flex-col gap-4 md:w-1/3">
            {/* Article 2 */}
            <div className="slide2 group relative overflow-hidden rounded-[6px] hover:cursor-pointer">
              {/* Background Image Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${articles[1].coverImage})` }}
              ></div>
              {/* Darkening Overlay & Text */}
              <div className="relative flex h-full min-h-[15rem] flex-col items-start justify-end bg-black/20 p-4 text-white transition-colors duration-300 group-hover:bg-black/40">
                <div className="translate-y-[30px] transform transition-all duration-300 group-hover:translate-y-[-10px]">
                  <h2 className="line-clamp-2 text-2xl text-slate-100 md:text-3xl">
                    {articles[1].title}
                  </h2>
                  <p className="max-w-lg text-sm text-slate-200">
                    {articles[1].date}
                  </p>
                </div>
                <p className="description hidden max-w-lg translate-y-4 transform text-sm text-slate-200 opacity-0 blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none md:flex">
                  {articles[1].description}
                </p>
              </div>
              <Link
                href={articles[1].slug}
                className="absolute inset-0 z-10"
                aria-label={articles[1].title}
              ></Link>
            </div>

            {/* Article 3 */}
            <div className="slide3 group relative overflow-hidden rounded-[6px] hover:cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${articles[2].coverImage})` }}
              ></div>
              <div className="relative flex h-full min-h-[15rem] flex-col items-start justify-end bg-black/20 p-4 text-white transition-colors duration-300 group-hover:bg-black/40">
                <div className="translate-y-[30px] transform transition-all duration-300 group-hover:translate-y-[-10px]">
                  <h2 className="line-clamp-2 text-2xl text-slate-100 md:text-3xl">
                    {articles[2].title}
                  </h2>
                  <p className="max-w-lg text-sm text-slate-200">
                    {articles[2].date}
                  </p>
                </div>
                <p className="description hidden max-w-lg translate-y-4 transform text-sm text-slate-200 opacity-0 blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none md:flex">
                  {articles[2].description}
                </p>
              </div>
              <Link
                href={articles[2].slug}
                className="absolute inset-0 z-10"
                aria-label={articles[2].title}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlesHero
