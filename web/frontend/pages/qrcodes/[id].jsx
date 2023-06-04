import { Card, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { Loading, TitleBar } from "@shopify/app-bridge-react";
import { QRCodeForm } from "../../components";
import { useParams } from 'react-router-dom';

export default function QRCodeEdit() {
    const breadcrumbs = [{ content: "QR codes", url: "/" }];

    /*
       These are mock values.
       Set isLoading to false to preview the page without loading markup.
    */
    const isLoading = false;
    const isRefetching = false;
    const QRCodes = [
        {
            createdAt: "2022-06-13",
            destination: "checkout",
            title: "My first QR code",
            id: 1,
            discountCode: "SUMMERDISCOUNT",
            product: {
                title: "Faded t-shirt",
            }
        },
        {
            createdAt: "2022-06-13",
            destination: "product",
            title: "My second QR code",
            id: 2,
            discountCode: "WINTERDISCOUNT",
            product: {
                title: "Cozy parka",
            }
        },
        {
            createdAt: "2022-06-13",
            destination: "product",
            title: "QR code for deleted product",
            id: 3,
            product: {
                title: "Deleted product",
            }
        },
    ];
    let { id } = useParams();
    let QRCode = null;
    if (id > 0) {
        //get the article with the id used as a parameter in the request
        QRCode = QRCodes.find(QRCode => QRCode.id == id);
    }

    /* Loading action and markup that uses App Bridge and Polaris components */
    if (isLoading || isRefetching) {
        return (
            <Page>
                <TitleBar
                    title="Edit QR code"
                    breadcrumbs={breadcrumbs}
                    primaryAction={null}
                />
                <Loading />
                <Layout>
                    <Layout.Section>
                        <Card sectioned title="Title">
                            <SkeletonBodyText />
                        </Card>
                        <Card title="Product">
                            <Card.Section>
                                <SkeletonBodyText lines={1} />
                            </Card.Section>
                            <Card.Section>
                                <SkeletonBodyText lines={3} />
                            </Card.Section>
                        </Card>
                        <Card sectioned title="Discount">
                            <SkeletonBodyText lines={2} />
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>
                        <Card sectioned title="QR code" />
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }

    return (
        <Page>
            <TitleBar
                title="Edit QR code"
                breadcrumbs={breadcrumbs}
                primaryAction={null}
            />
            {QRCode != null && <QRCodeForm QRCode={QRCode} />}
        </Page>
    );
}
