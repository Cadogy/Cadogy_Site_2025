import React from "react";
import Link from "next/link";

// Define the shape of an Article
interface Article {
  title: string;
  date: string;
  description: string;
  coverImage: string;
  slug: string;
}

interface ArticlesHeroProps {
  articles: Article[]; // Define articles as an array of Article objects
}

const ArticlesHero: React.FC<ArticlesHeroProps> = ({ articles }) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[68rem]">
        <div className="flex flex-col items-center mb-[3.5rem] mt-[5rem]">
          <h2 className="text-[14px]">News</h2>
          <h1 className="text-[50px]">Articles</h1>
        </div>
        <div className="flex w-full justify-center gap-4">
          {/* Article 1 */}
          <div className="group hover:cursor-pointer slide1 rounded-[6px] w-2/3 relative overflow-hidden">
            {/* Background Image Zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${articles[0].coverImage})` }}
            ></div>
            {/* Darkening Overlay & Text */}
            <div className="relative flex flex-col items-start justify-end h-full min-h-[30rem] p-4 text-white bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
              <div className="transition-all duration-300 transform translate-y-[50px] group-hover:translate-y-[-10px]">
                <h2 className="text-4xl md:text-3xl text-slate-50 line-clamp-2">
                  {articles[0].title} {/* Article title */}
                </h2>
                <p className="md:flex text-sm text-slate-50 max-w-lg">{articles[0].date}</p>
              </div>
              <p className="description hidden md:flex text-sm text-slate-50 max-w-lg transition-all duration-300 transform translate-y-4 opacity-0 blur-md group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
                {articles[0].description} {/* Article description */}
              </p>
            </div>
            {/* Absolute positioned Link to make the whole div clickable */}
            <Link href={articles[0].slug} className="absolute inset-0 z-10" aria-label={articles[0].title}></Link>
          </div>

          {/* Article 2 and Article 3 */}
          <div className="w-1/3 flex flex-col gap-4">
            {/* Article 2 */}
            <div className="group hover:cursor-pointer slide2 rounded-[6px] relative overflow-hidden">
              {/* Background Image Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${articles[1].coverImage})` }}
              ></div>
              {/* Darkening Overlay & Text */}
              <div className="relative flex flex-col items-start justify-end h-full min-h-[15rem] p-4 text-white bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
                <div className="transition-all duration-300 transform translate-y-[30px] group-hover:translate-y-[-10px]">
                  <h2 className="text-4xl md:text-3xl text-slate-100 line-clamp-2">
                    {articles[1].title}
                  </h2>
                  <p className="md:flex text-sm text-slate-200 max-w-lg">{articles[1].date}</p>
                </div>
                <p className="description hidden md:flex text-sm text-slate-200 max-w-lg transition-all duration-300 transform translate-y-4 opacity-0 blur-md group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
                  {articles[1].description}
                </p>
              </div>
              {/* Absolute positioned Link to make the whole div clickable */}
              <Link href={articles[1].slug} className="absolute inset-0 z-10" aria-label={articles[1].title}></Link>
            </div>

            {/* Article 3 */}
            <div className="group hover:cursor-pointer slide3 rounded-[6px] relative overflow-hidden">
              {/* Background Image Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${articles[2].coverImage})` }}
              ></div>
              {/* Darkening Overlay & Text */}
              <div className="relative flex flex-col items-start justify-end h-full min-h-[15rem] p-4 text-white bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
                <div className="transition-all duration-300 transform translate-y-[50px] group-hover:translate-y-[-10px]">
                  <h2 className="text-4xl md:text-3xl text-slate-100 line-clamp-2">
                    {articles[2].title}
                  </h2>
                  <p className="md:flex text-sm text-slate-200 max-w-lg">{articles[2].date}</p>
                </div>
                <p className="description hidden md:flex text-sm text-slate-200 max-w-lg transition-all duration-300 transform translate-y-4 opacity-0 blur-md group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
                  {articles[2].description}
                </p>
              </div>
              {/* Absolute positioned Link to make the whole div clickable */}
              <Link href={articles[2].slug} className="absolute inset-0 z-10" aria-label={articles[2].title}></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesHero;