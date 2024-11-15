import {GetProp, Image, message, Upload, UploadFile, UploadProps} from "antd";
import {useState} from "react";
import {WEB_CONFIG, WEB_URL} from "../../config/RequestConfig.ts";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type UploadFileProp = {
    url: string;
    callback: (url: string) => void;
}
const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能选择JPG/PNG格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('图片大小不能超过10MB!');
    }
    return isJpgOrPng && isLt2M;
};

function UploadForSingleImage({url, callback}: UploadFileProp) {
    const [loading, setLoading] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [avatar, setAvatar] = useState(url);
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setPreviewImage(url)
            });
            setAvatar(info.file.response.data)
            callback(info.file.response.data);
            return;
        }
        if (info.file.status === 'removed') {
            setAvatar('')
            callback('');
        }

    };
    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            {/*{loading ? <LoadingOutlined/> : <PlusOutlined/>}*/}
            上传图片
        </button>
    );
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            getBase64(file.originFileObj as FileType, (preview) => {
                file.preview = preview;
            });
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
    };
    return (
        <>
            <Upload
                name="file"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={true}
                action={WEB_URL + WEB_CONFIG.upload}
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
            >
                {avatar == '' && !loading ? uploadButton : null}
            </Upload>

            {previewImage && (
                <Image
                    wrapperStyle={{display: 'none'}}
                    preview={{
                        visible: previewVisible,
                        onVisibleChange: (visible) => setPreviewVisible(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    )
}

export default UploadForSingleImage
