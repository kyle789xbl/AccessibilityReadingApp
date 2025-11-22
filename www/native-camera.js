// Native Camera Wrapper for Capacitor
class NativeCamera {
    constructor() {
        this.video = null;
        this.isNative = typeof Capacitor !== 'undefined';
    }

    async initialize(videoElement) {
        this.video = videoElement;
        
        if (this.isNative) {
            console.log('Using native camera via Capacitor');
            return this.initializeNativeCamera();
        } else {
            console.log('Using web camera (browser fallback)');
            return this.initializeWebCamera();
        }
    }

    async initializeNativeCamera() {
        // Request camera permissions
        const permissions = await Capacitor.Plugins.Camera.requestPermissions({
            permissions: ['camera']
        });
        
        if (permissions.camera !== 'granted') {
            throw new Error('Camera permission denied');
        }

        // For native, we'll use a hybrid approach:
        // Use web getUserMedia but Capacitor will route it to native camera
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 3840, min: 1920 },
                height: { ideal: 2160, min: 1080 },
                // Native camera automatically handles focus
            }
        });

        this.video.srcObject = stream;
        await this.video.play();
        
        return stream;
    }

    async initializeWebCamera() {
        // Standard web camera initialization
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        });

        this.video.srcObject = stream;
        await this.video.play();
        
        return stream;
    }

    async capturePhoto() {
        if (this.isNative) {
            // Use native camera capture for better quality
            try {
                const photo = await Capacitor.Plugins.Camera.getPhoto({
                    quality: 95,
                    allowEditing: false,
                    resultType: 'base64',
                    source: 'camera',
                    saveToGallery: false,
                    correctOrientation: true,
                    width: 3840,
                    height: 2160
                });
                
                return photo.base64String;
            } catch (error) {
                console.log('Native capture failed, using video frame:', error);
                return this.captureFromVideo();
            }
        } else {
            return this.captureFromVideo();
        }
    }

    captureFromVideo() {
        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.video, 0, 0);
        
        return canvas.toDataURL('image/jpeg', 0.95).split(',')[1];
    }

    async stop() {
        if (this.video && this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
        }
    }
}

window.NativeCamera = NativeCamera;
