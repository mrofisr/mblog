import Layout from "@/components/custom/layout";
import Title from "@/components/custom/title";
import config from "@/config/config";

export default async function About() {
    return (<>
        <Layout title={config.page.project.header} description={`${config.page.project.title} - ${config.page.project.subtitle}`}>
            <Title title={config.page.project.title} subtitle={config.page.project.subtitle} />
        </Layout>
    </>)
}