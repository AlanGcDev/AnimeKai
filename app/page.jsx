import "../public/css/animekai-main.css"
import NewsList from "@/components/NewsList"
import NewsIndex from "@/components/NewsIndex"

export const metadata = {
    title: 'AnimeKai',
  }
export default function Page() {
    return (
        <>
        <div className="container">

        <NewsList></NewsList>
        </div>
        <NewsIndex></NewsIndex>
        </>
        
    )
}