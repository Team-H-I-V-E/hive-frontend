import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article/aritlce.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-article-write',
    templateUrl: './article-write.component.html',
    styleUrls: ['./article-write.component.scss'],
    standalone: false,
})
export class ArticleWriteComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    articleForm!: FormGroup;
    imageFiles: File[] = [];
    imagePreviews: string[] = [];
    isDragging = false;

    constructor(
        private fb: FormBuilder,
        private articleService: ArticleService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.articleForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
        });

        // ✅ 메시지 리스너 등록 (cropper.html에서 메시지 수신)
        window.addEventListener('message', this.handleCropResult.bind(this), false);
    }

    handleCropResult(event: MessageEvent): void {
        if (event.data?.croppedImage) {
            const base64 = event.data.croppedImage;
            const blob = this.dataURLToBlob(base64);
            const file = new File([blob], `cropped_${Date.now()}.png`, { type: 'image/png' });

            this.imageFiles.push(file);
            this.imagePreviews.push(base64);
        }
    }

    onImageSelected(event: Event): void {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                this.openCropWindow(base64);
            };
            reader.readAsDataURL(file);
        }
        target.value = '';
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;

        const files = event.dataTransfer?.files;
        if (files?.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                this.openCropWindow(base64);
            };
            reader.readAsDataURL(file);
        }
    }

    openCropWindow(base64: string): void {
        const cropUrl = `${window.location.origin}/assets/cropper.html`;
        const popup = window.open(cropUrl, '_blank', 'width=600,height=600');

        if (!popup) {
            alert('팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.');
            return;
        }

        // ✅ popup에 메시지를 안전하게 보내기 위한 load 이벤트 리스너 사용
        const onMessageReady = () => {
            popup?.postMessage({ image: base64 }, window.location.origin);
            window.removeEventListener('message', onMessageReady);
        };

        // popup이 로드되고 메시지를 받을 준비가 되면 'ready' 메시지를 먼저 받는다고 가정
        const waitForReady = (event: MessageEvent) => {
            if (event.origin === window.location.origin && event.data === 'ready') {
                popup?.postMessage({ image: base64 }, window.location.origin);
                window.removeEventListener('message', waitForReady);
            }
        };

        window.addEventListener('message', waitForReady);
    }

    triggerFileSelect(): void {
        this.fileInput.nativeElement?.click();
    }

    removeImage(index: number): void {
        this.imageFiles.splice(index, 1);
        this.imagePreviews.splice(index, 1);
    }

    submitArticle(): void {
        if (this.articleForm.invalid) return;

        const formData = new FormData();
        formData.append('articleTitle', this.articleForm.value.title);
        formData.append('articleContents', this.articleForm.value.content);

        this.imageFiles.forEach(file => {
            formData.append('files', file); // ✅ 여기 수정
        });

        this.articleService.createArticle(formData).subscribe({
            next: () => {
                console.log('게시글 등록 성공');
                this.router.navigate(['/article']);
            },
            error: (err) => console.error('업로드 실패', err),
        });
    }

    dataURLToBlob(dataURL: string): Blob {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }
}