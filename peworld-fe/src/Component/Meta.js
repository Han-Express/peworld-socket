import Head from 'next/head'
import Script from 'next/script'

const Meta = ({meta}) => {

    return(<>
        <Head>
            <title>{meta.title}</title>
            <meta name="keyword" content={meta.keyword}/>
            <meta name='description' content={meta.description} />
            <meta charSet='utf-8'/>
        </Head>
    </>
        
    )
}

Meta.defaultProps = {
    meta: {
        title: "peworld-fe",
        keyword: "hiring a job",
        description: "place for company to hiring people"
    } 
}

export default Meta