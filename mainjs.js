  //导航
        // 确保DOM加载完成后执行
        document.addEventListener('DOMContentLoaded', function () {
            const hamburger = document.getElementById('hamburger');
            const navDrawer = document.getElementById('navDrawer');
            const drawerMask = document.getElementById('drawerMask');
            const drawerClose = document.querySelector('.drawer-close');

            // 点击汉堡按钮打开抽屉
            hamburger.addEventListener('click', function () {
                navDrawer.classList.add('open');
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            });

            // 点击遮罩关闭抽屉
            drawerMask.addEventListener('click', function () {
                navDrawer.classList.remove('open');
                document.body.style.overflow = ''; // 恢复滚动
            });

            // 点击关闭按钮关闭抽屉
            if (drawerClose) {
                drawerClose.addEventListener('click', function () {
                    navDrawer.classList.remove('open');
                    document.body.style.overflow = '';
                });
            }

            // 点击抽屉内链接也关闭抽屉
            const drawerLinks = document.querySelectorAll('#navDrawer a');
            drawerLinks.forEach(link => {
                link.addEventListener('click', function () {
                    navDrawer.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });

            // ESC键关闭抽屉
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
                    navDrawer.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        });

        /* 放大图片（点击关闭） */
        function showLarge(src) {
            const img = document.getElementById('web03-large');
            img.src = src;                              // 换图
            document.getElementById('web03-overlay').classList.add('show');
        }
        function hideLarge() {
            document.getElementById('web03-overlay').classList.remove('show');
        }




//web03轮播

        //轮播
        // 轮播功能JavaScript
        document.addEventListener('DOMContentLoaded', function () {
            const carouselContainer = document.querySelector('.web03-overlap-bar');
            if (!carouselContainer) return;

            const items = document.querySelectorAll('.web03-item');
            const indicatorsContainer = document.querySelector('.web03-indicators');
            const prevBtn = document.querySelector('.web03-prev-btn');
            const nextBtn = document.querySelector('.web03-next-btn');
            const isMobile = window.innerWidth <= 1024;

            let currentIndex = 0;

            // 创建轮播指示器
            function createIndicators() {
                if (!indicatorsContainer) return;

                indicatorsContainer.innerHTML = '';
                items.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.className = `web03-indicator ${index === 0 ? 'active' : ''}`;
                    indicator.addEventListener('click', () => goToSlide(index));
                    indicatorsContainer.appendChild(indicator);
                });
            }

            // 更新轮播状态
            function updateCarousel() {
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                });

                // 更新指示器
                const indicators = document.querySelectorAll('.web03-indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }

            // 切换到指定幻灯片
            function goToSlide(index) {
                if (index < 0) index = items.length - 1;
                if (index >= items.length) index = 0;

                currentIndex = index;
                updateCarousel();
            }

            // 下一张
            function nextSlide() {
                goToSlide(currentIndex + 1);
            }

            // 上一张
            function prevSlide() {
                goToSlide(currentIndex - 1);
            }

            // 初始化轮播
            function initCarousel() {
                if (!isMobile) {
                    // 桌面端保持原有逻辑
                    items.forEach(item => {
                        item.style.position = 'relative';
                        item.style.width = '700px';
                        item.style.marginLeft = '-480px';
                        item.style.opacity = '1';
                        item.style.pointerEvents = 'auto';
                    });

                    items[0].style.marginLeft = '0';
                    return;
                }

                // 移动端轮播逻辑
                createIndicators();
                updateCarousel();

                // 添加点击事件
                items.forEach(item => {
                    item.addEventListener('click', function (e) {
                        // 如果点击的是图片，执行原有的放大功能
                        if (e.target.classList.contains('web03-thumb')) {
                            const fullImage = e.target.dataset.full;
                            if (fullImage && typeof showLarge === 'function') {
                                showLarge(fullImage);
                            }
                        }
                    });
                });

                // 控制按钮事件
                if (prevBtn) prevBtn.addEventListener('click', prevSlide);
                if (nextBtn) nextBtn.addEventListener('click', nextSlide);

                // 触摸滑动支持
                let touchStartX = 0;
                let touchEndX = 0;

                carouselContainer.addEventListener('touchstart', function (e) {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });

                carouselContainer.addEventListener('touchend', function (e) {
                    touchEndX = e.changedTouches[0].screenX;
                    const diff = touchStartX - touchEndX;

                    if (Math.abs(diff) > 50) { // 滑动阈值
                        if (diff > 0) {
                            nextSlide(); // 向左滑动，下一张
                        } else {
                            prevSlide(); // 向右滑动，上一张
                        }
                    }
                }, { passive: true });

                // 为轮播项目添加点击切换功能（非图片区域）
                items.forEach((item, index) => {
                    item.addEventListener('click', function (e) {
                        // 如果不是点击在图片上，就切换轮播
                        if (!e.target.classList.contains('web03-thumb')) {
                            goToSlide(index);
                        }
                    });
                });
            }

            // 响应式处理
            function handleResize() {
                const nowIsMobile = window.innerWidth <= 1024;

                if (nowIsMobile !== isMobile) {
                    location.reload(); // 简单处理：重新加载页面
                }
            }

            // 初始化
            initCarousel();

            // 监听窗口大小变化
            window.addEventListener('resize', handleResize);
        });



//web07滑动＋按钮切换

        document.addEventListener('DOMContentLoaded', function () {
            const cards = document.querySelectorAll('.web07-card');
            const list = document.querySelector('.web07-list');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dots = document.querySelectorAll('.web07-indicator-dot');
            const fadeLeft = document.querySelector('.web07-fade-left');
            const fadeRight = document.querySelector('.web07-fade-right');
            const leftArrow = document.querySelector('.left-arrow');
            const rightArrow = document.querySelector('.right-arrow');

            // 检测是否移动设备
            const isMobile = window.matchMedia('(max-width: 1024px)').matches;

            if (isMobile) {
                // 初始化变量
                let currentIndex = 0;
                const cardCount = cards.length;
                const cardWidth = cards[0].offsetWidth + 16; // 卡片宽度 + 间距

                // 更新按钮状态和指示器
                function updateUI() {
                    // 更新左右按钮状态
                    prevBtn.classList.toggle('disabled', currentIndex === 0);
                    nextBtn.classList.toggle('disabled', currentIndex === cardCount - 1);

                    // 更新指示器
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });

                    // 更新渐变遮罩
                    fadeLeft.classList.toggle('show', currentIndex > 0);
                    fadeRight.classList.toggle('show', currentIndex < cardCount - 1);

                    // 更新卡片激活状态
                    cards.forEach((card, index) => {
                        card.classList.toggle('active', index === currentIndex);
                    });
                }

                // 滚动到指定索引
                function scrollToIndex(index) {
                    if (index < 0 || index >= cardCount) return;

                    currentIndex = index;
                    const scrollPosition = index * cardWidth;

                    list.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });

                    updateUI();
                }

                // 上一个卡片
                function prevCard() {
                    if (currentIndex > 0) {
                        scrollToIndex(currentIndex - 1);
                    }
                }

                // 下一个卡片
                function nextCard() {
                    if (currentIndex < cardCount - 1) {
                        scrollToIndex(currentIndex + 1);
                    }
                }

                // 按钮事件监听
                prevBtn.addEventListener('click', prevCard);
                nextBtn.addEventListener('click', nextCard);

                // 遮罩内箭头点击事件
                leftArrow.addEventListener('click', prevCard);
                rightArrow.addEventListener('click', nextCard);

                // 指示器点击事件
                dots.forEach(dot => {
                    dot.addEventListener('click', function () {
                        const index = parseInt(this.getAttribute('data-index'));
                        scrollToIndex(index);
                    });
                });

                // 卡片点击显示遮罩
                cards.forEach(card => {
                    card.addEventListener('click', function (e) {
                        const index = Array.from(cards).indexOf(this);
                        scrollToIndex(index);
                    });
                });

                // 滚动事件监听
                list.addEventListener('scroll', function () {
                    const scrollLeft = list.scrollLeft;
                    const newIndex = Math.round(scrollLeft / cardWidth);

                    if (newIndex !== currentIndex) {
                        currentIndex = newIndex;
                        updateUI();
                    }
                });

                // 触摸滑动支持
                let startX = 0;
                let startScrollLeft = 0;
                let isDragging = false;

                list.addEventListener('touchstart', function (e) {
                    startX = e.touches[0].clientX;
                    startScrollLeft = list.scrollLeft;
                    isDragging = true;
                });

                list.addEventListener('touchmove', function (e) {
                    if (!isDragging) return;

                    const currentX = e.touches[0].clientX;
                    const diffX = startX - currentX;

                    list.scrollLeft = startScrollLeft + diffX;
                });

                list.addEventListener('touchend', function () {
                    isDragging = false;

                    // 滑动结束后对齐到最近的卡片
                    const scrollLeft = list.scrollLeft;
                    const newIndex = Math.round(scrollLeft / cardWidth);
                    scrollToIndex(newIndex);
                });

                // 初始化UI
                updateUI();

                // 窗口大小变化时重新计算
                window.addEventListener('resize', function () {
                    const newCardWidth = cards[0].offsetWidth + 16;
                    if (newCardWidth !== cardWidth) {
                        scrollToIndex(currentIndex);
                    }
                });

            } else {
                // 桌面端：保持hover效果
                cards.forEach(card => {
                    card.addEventListener('mouseenter', function () {
                        this.classList.add('active');
                    });

                    card.addEventListener('mouseleave', function () {
                        this.classList.remove('active');
                    });
                });
            }
        });