import { Card, Col, Form, Modal, Row, message } from "antd"
import { useEffect, useState } from "react"
import DescriptionProfile from "../../modules/profile/description"
import UserStore from "../../modules/profile/state"
import { useUser } from "../../modules/profile"
import { CustomerType, useAddCustomer, useCustomerAll, useCustomerByUser, useUpdateCustomer } from "../../modules/customer"
import CustomerStore from "../../modules/customer/state"
import DescriptionCustomer from "../../modules/customer/description"
import CustomerForm from "../../modules/customer/form"
import { fetch } from "../../utils/reponse"
import { MarketingType, useAddMarketing, useMarketingAll, useMarketingByUser, useUpdateMarketing } from "../../modules/marketing"
import MarketingStore from "../../modules/marketing/state"
import MarketingForm from "../../modules/marketing/form"
import DescriptionMarketing from "../../modules/marketing/description"

const ProfileIndex = () => {
    const locale = JSON.parse(localStorage.getItem("user") as string)
    const { data, mutateAsync } = useUser()
    const [reload, setReload] = useState<boolean>(false)
    const { getOne, single } = UserStore()

    useEffect(() => {
        if (locale.id) {
            mutateAsync(locale.id)
        }
    }, [locale.id, reload])

    useEffect(() => {
        if (data) {
            getOne(data.data?.Data)
        }
    }, [data])

    const span = {
        md: 24,
        lg: 12
    }

    const ViewCustomer = () => {
        return (
            <CustomerInfo
                userid={locale.id}
                header={
                    <Col
                        {...span}
                    >
                        <DescriptionProfile
                            data={single}
                        />
                    </Col>
                }
                onReload={setReload}
            />
        )
    }

    const ViewMarketing = () => {
        return (
            <MarketingInfo
                userid={locale.id}
                header={
                    <Col
                        {...span}
                    >
                        <DescriptionProfile
                            data={single}
                        />
                    </Col>
                }
                onReload={setReload}
            />
        )
    }


    return (
        <>
            {locale.role === 'user' && <ViewCustomer />}
            {locale.role === 'mkt' && <ViewMarketing />}
            {
                locale.role != 'mkt' && locale.role != 'user' &&
                <DescriptionProfile
                    data={single}
                />
            }
        </>
    )
}

export default ProfileIndex

const MarketingInfo = (props: {
    userid: string;
    header: React.ReactNode;
    onReload: (value: boolean) => void;
}) => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const mutationMarketing = useMarketingByUser()
    const storeMarketing = MarketingStore()

    useEffect(() => {
        if (props.userid) {
            mutationMarketing.mutateAsync(props.userid)
        }
    }, [props.userid])

    useEffect(() => {
        if (mutationMarketing.data) {
            storeMarketing.getOne(mutationMarketing.data?.data?.Data)
        }
    }, [mutationMarketing.data])

    const showModal = () => {
        if (mutationMarketing.data?.data?.Data) {
            setIsModalEditOpen((prev: boolean) => !prev)
            props.onReload(false)
        } else {
            props.onReload(false)
            setIsModalAddOpen((prev: boolean) => !prev)
        }
    }

    const onCancel = () => {
        isModalAddOpen && setIsModalAddOpen(false)
        isModalEditOpen && setIsModalEditOpen(false)
        props.onReload(true)
    }

    const span = {
        md: 24,
        lg: 12
    }

    return (
        <Card
            title='LIHAT AKUN'
            loading={mutationMarketing.isLoading}
        >
            <Row gutter={[10, 10]}>
                {
                    props.header
                }
                <Col
                    {...span}
                >
                    <DescriptionMarketing
                        data={storeMarketing.single}
                        onAdd={showModal}
                    />
                    <AddMarketing
                        modal={isModalAddOpen}
                        onCancel={onCancel}
                    />
                    <EditMarketing
                        data={storeMarketing.single}
                        modal={isModalEditOpen}
                        onCancel={onCancel}
                    />
                </Col>
            </Row>
        </Card>
    )
}

const AddMarketing = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addMarketing = useAddMarketing()
    const marketingMutation = useMarketingAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addMarketing.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addMarketing.isSuccess) {
            message.success(addMarketing.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addMarketing.isError) {
            message.error(_fetch.getAxiosMessage(addMarketing.error))
            props.onCancel()
        }
        return () => {
            marketingMutation.refetch()
            form.resetFields()
        }
    }, [addMarketing.isSuccess, addMarketing.isError])

    return (
        <Modal
            title="UBAH INFORMASI MARKETING"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <MarketingForm
                form={form}
            />
        </Modal>
    )
}
const EditMarketing = (props: {
    data: MarketingType;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const editMarketing = useUpdateMarketing()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editMarketing.mutateAsync({
                ...values,
                id: props.data.id
            })
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (props.data) {
            form.setFieldsValue(props.data)
        }
    }, [props.data])

    useEffect(() => {
        if (editMarketing.isSuccess) {
            message.success(editMarketing.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editMarketing.isError) {
            message.error(_fetch.getAxiosMessage(editMarketing.error))
            props.onCancel()
        }
        return () => {
        }
    }, [editMarketing.isSuccess, editMarketing.isError])

    return (
        <Modal
            title="UBAH INFORMASI MARKETING"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <MarketingForm
                form={form}
            />
        </Modal>
    )
}

const CustomerInfo = (props: {
    userid: string;
    header: React.ReactNode;
    onReload: (value: boolean) => void;
}) => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const mutationCustomer = useCustomerByUser()
    const storeCustomer = CustomerStore()


    useEffect(() => {
        if (props.userid) {
            mutationCustomer.mutateAsync(props.userid)
        }
    }, [props.userid])

    useEffect(() => {
        if (mutationCustomer.data) {
            storeCustomer.getOne(mutationCustomer.data?.data?.Data)
        }
    }, [mutationCustomer.data])

    const showModal = () => {
        if (mutationCustomer.data?.data?.Data) {
            setIsModalEditOpen((prev: boolean) => !prev)
            props.onReload(false)
        } else {
            props.onReload(false)
            setIsModalAddOpen((prev: boolean) => !prev)
        }
    }

    const onCancel = () => {
        isModalAddOpen && setIsModalAddOpen(false)
        isModalEditOpen && setIsModalEditOpen(false)
        props.onReload(true)
    }

    const span = {
        md: 24,
        lg: 12
    }

    return (
        <Card
            title='LIHAT AKUN'
            loading={mutationCustomer.isLoading}
        >
            <Row gutter={[10, 10]}>
                {
                    props.header
                }
                <Col
                    {...span}
                >
                    <DescriptionCustomer
                        data={storeCustomer.single}
                        onAdd={showModal}
                    />
                    <AddCustomer
                        modal={isModalAddOpen}
                        onCancel={onCancel}
                    />
                    <EditCustomer
                        data={storeCustomer.single}
                        modal={isModalEditOpen}
                        onCancel={onCancel}
                    />
                </Col>
            </Row>
        </Card>
    )
}

const AddCustomer = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addCustomer = useAddCustomer()
    const customerMutation = useCustomerAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addCustomer.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addCustomer.isSuccess) {
            message.success(addCustomer.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addCustomer.isError) {
            message.error(_fetch.getAxiosMessage(addCustomer.error))
            props.onCancel()
        }
        return () => {
            customerMutation.refetch()
            form.resetFields()
        }
    }, [addCustomer.isSuccess, addCustomer.isError])

    return (
        <Modal
            title="UBAH INFORMASI PELANGGAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <CustomerForm
                form={form}
            />
        </Modal>
    )
}
const EditCustomer = (props: {
    data: CustomerType;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const editCustomer = useUpdateCustomer()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editCustomer.mutateAsync({
                ...values,
                id: props.data.id
            })
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (props.data) {
            form.setFieldsValue(props.data)
        }
    }, [props.data])

    useEffect(() => {
        if (editCustomer.isSuccess) {
            message.success(editCustomer.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editCustomer.isError) {
            message.error(_fetch.getAxiosMessage(editCustomer.error))
            props.onCancel()
        }
        return () => {
        }
    }, [editCustomer.isSuccess, editCustomer.isError])

    return (
        <Modal
            title="UBAH INFORMASI PELANGGAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <CustomerForm
                form={form}
            />
        </Modal>
    )
}