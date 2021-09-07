const fileSize = {
    "2mb": 2 * 1024 * 1024
}

const fileType = {
    image: [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
        "image/jpg",
    ],
    document: [
        "application/pdf",
        "application/msword",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
}

module.exports = { fileSize, fileType }