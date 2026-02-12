// --- 1. Theme Toggle & Particles Logic ---
        const themeBtn = document.getElementById('themeBtn');
        const html = document.documentElement;
        const icon = themeBtn.querySelector('i');
        const canvas = document.getElementById('bg-particles');
        const ctx = canvas.getContext('2d');
        let particlesArray;
        let particleColor = 'rgba(148, 163, 184, 0.5)';

        function updateParticleColor(theme) {
            if(theme === 'light') particleColor = 'rgba(71, 85, 105, 0.2)';
            else particleColor = 'rgba(148, 163, 184, 0.5)';
        }

        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
        updateParticleColor(savedTheme);

        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
            updateParticleColor(newTheme);
        });

        function updateIcon(theme) {
            if(theme === 'light') {
                icon.className = 'fas fa-moon';
                themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark';
            } else {
                icon.className = 'fas fa-sun';
                themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
            }
        }

        // --- 2. Music Player Logic ---
        const musicBtn = document.getElementById('musicBtn');
        const bgMusic = document.getElementById('bgMusic');
        let isMusicPlaying = false;

        musicBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-play"></i> Play Music';
                isMusicPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                    isMusicPlaying = true;
                }).catch(error => {
                    console.log("Audio play failed: ", error);
                    alert("Gagal memutar musik. Pastikan browser Anda mengizinkan audio.");
                });
            }
        });

        // --- 3. Skill Bars Animation (New Smooth Logic) ---
        // Menggunakan Intersection Observer agar animasi berjalan saat di-scroll
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.skill-fill').forEach(bar => {
            skillObserver.observe(bar);
        });

        // --- 4. Seamless Loop Gallery ---
        const verticalImages = [
            { src: 'gambar/vertikal/Capture.jpg', title: 'Typography', desc: 'Moment' },
            { src: 'gambar/vertikal/Cerita Instagram Kertas Robek Kolase Foto dan Kutipan.png', title: 'Typography', desc: 'Kutipan Hari Ini' },
            { src: 'gambar/vertikal/Dimensi Yang.jpg', title: 'Typography', desc: 'Dimensi yang Berbeda' },
            { src: 'gambar/vertikal/HILANG UNTUK HEALING.png', title: 'Typography', desc: 'Hilang Untuk Healing' },
            { src: 'gambar/vertikal/L.png', title: 'Typography', desc: 'Design Typography' },
            { src: 'gambar/vertikal/makima.jpg', title: 'GFX Design', desc: 'Makima' },
            { src: 'gambar/vertikal/No.jpg', title: 'Typography', desc: 'Arti Kebahagiaan' },
            { src: 'gambar/vertikal/Numpang porto ya, premium soalnya, hehe.jpg', title: 'GFX Design', desc: 'GTR Skyline' },
            { src: 'gambar/vertikal/SELF REWARD.jpg', title: 'Typography', desc: 'Self Reward' },
            { src: 'gambar/vertikal/Takina Inoue.png', title: 'GFX Design', desc: 'Takina Inoue' },
            { src: 'gambar/vertikal/Thank you self for (1).png', title: 'GFX Design', desc: 'Thank you self for saving you' },
            { src: 'gambar/vertikal/Unknown name.png', title: 'Typography', desc: 'Apa itu kehidupan' },
            { src: 'portofolio/Pamflet Ecoswap.jpg', title: 'Poster', desc: 'Jual beli barang bekas' },
        ];

        const horizontalImages = [
            { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80', title: 'Neon City', desc: 'Background' },
            { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80', title: 'Web Dev', desc: 'Frontend' },
            { src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=500&q=80', title: 'Server', desc: 'Backend' },
            { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80', title: 'Retro', desc: 'Game Dev' },
            { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80', title: 'Hardware', desc: 'IoT' }
        ];

        function createGalleryItem(item, type) {
            return `
                <div class="g-img ${type}">
                    <img src="${item.src}" alt="${item.title}">
                    <div class="g-overlay"><h5>${item.title}</h5><p>${item.desc}</p></div>
                </div>
            `;
        }

        function setupSeamlessLoop(trackId, images, type) {
            const track = document.getElementById(trackId);
            let htmlContent = images.map(item => createGalleryItem(item, type)).join('');
            track.innerHTML = htmlContent + htmlContent;
        }

        setupSeamlessLoop('track1', verticalImages, 'g-vertical');
        setupSeamlessLoop('track2', horizontalImages, 'g-horizontal');

        // --- 5. Particles Animation ---
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = (Math.random() * 1) - 0.5;
                this.speedY = (Math.random() * 1) - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = particleColor; 
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        initParticles();
        animateParticles();

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            });
        });