// 方案11：琥珀风格 - 现代复古主题
export const theme11 = {
    name: '琥珀',
    colors: {
        primary: '#E6A635',               // 更温润的琥珀金色
        secondary: '#F4B942',             // 稍亮的金色用于强调
        tertiary: '#B87333',              // 铜色，增加复古感
        background: '#0F0E0C',             // 更深的黑褐色，增强层次感
        text: {
            primary: '#FDF2F8',           // 暖白色主文字（保持不变）
            secondary: '#E6A635',         // 温润金色次要文字
            meta: '#A78BFA',              // 淡紫色元信息（保持不变）
            code: '#FEF3C7',              // 淡金色代码文字（保持不变）
            accent: '#F4B942',            // 亮金色强调色
            warm: '#8B4513',              // 马鞍棕色，用于分割线
            cream: '#F5F5DC'              // 米色，用于特殊强调区域
        },
        nav: {
            inactive: 'rgba(167, 139, 250, 0.6)',
            hover: 'rgba(230, 166, 53, 0.9)',
            active: '#E6A635',
            background: 'rgba(15, 14, 12, 0.95)',
            border: 'rgba(230, 166, 53, 0.3)'
        },
        card: {
            background: 'rgba(25, 22, 20, 0.85)',       // 稍微透明的深褐
            hover: 'rgba(35, 30, 28, 0.95)',            // 悬停时稍亮但保持优雅
            border: 'rgba(230, 166, 53, 0.25)',         // 温润金色边框
            shadow: '0 12px 40px rgba(230, 166, 53, 0.08), 0 4px 16px rgba(0, 0, 0, 0.3)',
            glow: '0 0 30px rgba(230, 166, 53, 0.15)'   // 温暖的金色光晕
        },
        sidebar: {
            background: 'transparent',                   // 侧边栏背景透明
            border: 'rgba(230, 166, 53, 0.3)',          // 温润金色边框
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        },
        button: {
            primary: {
                background: '#E6A635',
                hover: '#D4921A',
                text: '#0F0E0C'
            },
            secondary: {
                background: 'rgba(230, 166, 53, 0.15)',
                hover: 'rgba(230, 166, 53, 0.25)',
                border: 'rgba(230, 166, 53, 0.4)',
                text: '#E6A635'
            }
        },
        link: {
            default: '#E6A635',
            hover: '#F4B942',
            visited: '#A78BFA'
        },
        border: {
            light: 'rgba(230, 166, 53, 0.12)',
            medium: 'rgba(230, 166, 53, 0.25)',
            strong: 'rgba(230, 166, 53, 0.4)',
            accent: 'rgba(244, 185, 66, 0.3)'           // 用于特殊装饰
        },
        status: {
            success: '#059669',
            warning: '#D4921A',
            error: '#DC2626',
            info: '#0369A1'
        },
        gradients: {
            background: {
                type: 'radial',
                direction: 'ellipse at 25% 15%',
                colors: [
                    'rgba(230, 166, 53, 0.12)',    // 温润琥珀色
                    'rgba(139, 69, 19, 0.08)',     // 深棕色
                    'rgba(230, 166, 53, 0.05)',    // 淡金色
                    'transparent'
                ],
                color: '#0F0E0C'  // 主背景色用于主题切换器
            },
            card: {
                type: 'linear',
                direction: '135deg',
                colors: ['rgba(255, 251, 235, 0.9)', 'rgba(254, 240, 138, 0.7)']
            },
            button: {
                type: 'linear',
                direction: '135deg',
                colors: ['#E6A635', '#D4921A']
            },
            paper: {
                type: 'radial',
                direction: 'ellipse at center',
                colors: ['rgba(254, 243, 199, 0.8)', 'rgba(253, 230, 138, 0.6)']
            }
        }
    },
    typography: {
        fontFamily: {
            primary: '"Crimson Text", "Times New Roman", Georgia, serif',
            heading: '"Playfair Display", "Times New Roman", Georgia, serif',
            mono: '"Courier New", Consolas, Monaco, monospace'
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700
        },
        lineHeight: {
            tight: 1.3,
            normal: 1.6,
            relaxed: 1.8
        },
        letterSpacing: {
            tight: '-0.015em',
            normal: '0',
            wide: '0.05em'
        }
    },
    spacing: {
        contentWidth: '1100px',
        contentPadding: '32px',
        mainPaddingTop: '100px',
        sidebarWidth: '300px',
        sidebarSpacing: '36px',
        gap: {
            grid: '52px',
            articles: '32px',
            sidebar: '28px',
            navigation: '24px',
            form: '20px'
        },
        padding: {
            card: '32px',
            section: '40px',
            container: '32px'
        },
        margin: {
            section: '56px',
            element: '28px',
            small: '20px'
        },
        container: {
            maxWidth: '1100px',
            padding: {
                desktop: '32px',
                tablet: '28px',
                mobile: '20px'
            }
        }
    },
    borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        full: '50%'
    },
    shadows: {
        sm: '0 2px 8px rgba(230, 166, 53, 0.08)',
        md: '0 4px 16px rgba(230, 166, 53, 0.12)',
        lg: '0 8px 32px rgba(230, 166, 53, 0.15)',
        xl: '0 12px 48px rgba(230, 166, 53, 0.18)',
        card: '0 12px 40px rgba(230, 166, 53, 0.08), 0 4px 16px rgba(0, 0, 0, 0.3)',
        glow: '0 0 30px rgba(230, 166, 53, 0.15)',
        inner: 'inset 0 0 20px rgba(230, 166, 53, 0.05)',
        paper: '0 4px 20px rgba(230, 166, 53, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)'
    },
    transitions: {
        fast: '200ms ease-in-out',
        normal: '300ms ease-in-out',
        slow: '400ms ease-in-out',
        bounce: '350ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    breakpoints: {
        mobile: '768px',
        tablet: '1024px',
        desktop: '1280px'
    },
    zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modal: 1040,
        popover: 1050,
        tooltip: 1060
    },
    effects: {
        blur: {
            sm: '3px',
            md: '6px',
            lg: '12px'
        },
        texture: {
            paper: `
                radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(146, 64, 14, 0.02) 0%, transparent 50%)
            `,
            vintage: `
                linear-gradient(90deg, rgba(217, 119, 6, 0.02) 50%, transparent 50%),
                linear-gradient(rgba(245, 158, 11, 0.01) 50%, transparent 50%)
            `
        },
        sepia: 'sepia(20%) saturate(1.2) contrast(1.1)'
    },
    animations: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
        bounce: 'bounce 0.7s ease-in-out',
        warm: 'warm 3s ease-in-out infinite alternate'
    },
    layout: {
        header: {
            height: '90px',
            background: 'rgba(254, 243, 199, 0.95)',
            border: 'rgba(217, 119, 6, 0.2)',
            backdropFilter: 'blur(8px)'
        },
        sidebar: {
            width: '300px',
            background: 'transparent',
            border: 'rgba(245, 158, 11, 0.3)',
            padding: '40px'
        },
        main: {
            padding: '40px',
            gap: '40px'
        },
        footer: {
            background: 'rgba(254, 243, 199, 0.8)',
            border: 'rgba(217, 119, 6, 0.2)',
            padding: '32px'
        },
        container: {
            maxWidth: '1100px',
            padding: '0 32px'
        }
    },
    components: {
        card: {
            background: 'rgba(255, 251, 235, 0.8)',
            hover: 'rgba(254, 240, 138, 0.6)',
            border: 'rgba(217, 119, 6, 0.15)',
            radius: '24px',
            padding: '32px',
            shadow: '0 8px 32px rgba(146, 64, 14, 0.12)',
            texture: `
                radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)
            `
        },
        button: {
            radius: '16px',
            padding: '14px 28px',
            fontWeight: 600,
            transition: '300ms ease-in-out',
            letterSpacing: '0.025em'
        },
        input: {
            background: 'rgba(255, 251, 235, 0.8)',
            border: 'rgba(217, 119, 6, 0.2)',
            focus: 'rgba(217, 119, 6, 0.4)',
            radius: '16px',
            padding: '14px 20px'
        },
        modal: {
            background: 'rgba(255, 251, 235, 0.95)',
            border: 'rgba(217, 119, 6, 0.3)',
            radius: '32px',
            shadow: '0 24px 64px rgba(146, 64, 14, 0.2)',
            backdropFilter: 'blur(12px)'
        },
        tooltip: {
            background: 'rgba(69, 26, 3, 0.9)',
            color: '#FFFBEB',
            radius: '12px',
            shadow: '0 4px 16px rgba(146, 64, 14, 0.3)'
        },
        paper: {
            background: `
                radial-gradient(circle at 30% 40%, rgba(254, 240, 138, 0.4) 0%, transparent 70%),
                radial-gradient(circle at 70% 70%, rgba(253, 230, 138, 0.3) 0%, transparent 70%),
                linear-gradient(135deg, rgba(255, 251, 235, 0.9) 0%, rgba(254, 243, 199, 0.8) 100%)
            `,
            border: 'rgba(217, 119, 6, 0.1)',
            shadow: '0 4px 20px rgba(146, 64, 14, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)'
        }
    },
    customProperties: {
        // 琥珀主题特有的CSS变量
        '--amber-warmth': 'sepia(20%) saturate(1.2) contrast(1.1)',
        '--amber-paper': `
            radial-gradient(circle at 30% 40%, rgba(254, 240, 138, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 70% 70%, rgba(253, 230, 138, 0.3) 0%, transparent 70%),
            linear-gradient(135deg, rgba(255, 251, 235, 0.9) 0%, rgba(254, 243, 199, 0.8) 100%)
        `,
        '--amber-texture': `
            radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)
        `,
        '--amber-shadow': '0 8px 32px rgba(146, 64, 14, 0.12)',
        '--amber-border': 'rgba(217, 119, 6, 0.15)',
        '--amber-text': '#451A03',
        '--amber-accent': '#D97706'
    }
}
