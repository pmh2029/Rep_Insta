import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import useUploadFile from '../hooks/useUploadFile';

const ProgressBar = ({ file, setFile, setIsUrl }) => {
    const { url, progress } = useUploadFile(file);
    useEffect(() => {
        if (url) {
            setFile(null);
            setIsUrl(url);
        }
    }, [setFile, setIsUrl, url]);
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-1 rounded-full bg-violate md:mr-16"
        />
    );
};

export default ProgressBar;
