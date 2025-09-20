// 方案10：夜幕风格 - 暗黑护眼主题
export const theme10 = {
    name: '夜幕',
    colors: {
        primary: '#60A5FA',               // 明亮蓝色
        background: '#0A0A0F',            // 更深的黑色背景
        text: {
            primary: '#E2E8F0',           // 亮灰色主文字
            secondary: '#60A5FA',         // 蓝色次要文字
            meta: '#94A3B8',              // 中灰色元信息
            code: '#F8FAFC',              // 近白色代码文字
            accent: '#38BDF8'             // 天蓝色强调色
        },
        nav: {
            inactive: 'rgba(148, 163, 184, 0.8)',
            hover: 'rgba(96, 165, 250, 0.9)',
            active: '#60A5FA',
            background: 'rgba(10, 10, 15, 0.95)',
            border: 'rgba(96, 165, 250, 0.2)'
        },
        card: {
            background: 'transparent',                // 卡片背景透明
            hover: 'rgba(96, 165, 250, 0.1)',       // 悬停时淡蓝色
            border: 'rgba(96, 165, 250, 0.4)',      // 更明显的蓝色边框
            shadow: '0 8px 32px rgba(96, 165, 250, 0.15)' // 蓝色月光阴影
        },
        sidebar: {
            background: 'transparent',                 // 侧边栏背景透明
            border: 'rgba(96, 165, 250, 0.4)',       // 更明显的蓝边框
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        },
        button: {
            primary: {
                background: '#60A5FA',
                hover: '#3B82F6',
                text: '#0F1419'
            },
            secondary: {
                background: 'rgba(96, 165, 250, 0.1)',
                hover: 'rgba(96, 165, 250, 0.2)',
                border: 'rgba(96, 165, 250, 0.3)',
                text: '#60A5FA'
            }
        },
        link: {
            default: '#60A5FA',
            hover: '#38BDF8',
            visited: '#8B5CF6'
        },
        border: {
            light: 'rgba(96, 165, 250, 0.2)',
            medium: 'rgba(96, 165, 250, 0.4)',
            strong: 'rgba(96, 165, 250, 0.6)'
        },
        status: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#06B6D4'
        },
        gradients: {
            background: {
                type: 'radial',
                direction: 'ellipse at 30% 20%',
                colors: ['rgba(96, 165, 250, 0.35)', 'rgba(56, 189, 248, 0.25)', 'rgba(6, 182, 212, 0.15)', 'rgba(96, 165, 250, 0.08)', 'transparent'],
                color: '#0A0A0F'  // 主背景色用于主题切换器
            },
            card: {
                type: 'linear',
                direction: '135deg',
                colors: ['rgba(96, 165, 250, 0.08)', 'rgba(56, 189, 248, 0.05)', 'transparent']
            },
            button: {
                type: 'linear',
                direction: '135deg',
                colors: ['#60A5FA', '#3B82F6']
            }
        }
    },
    typography: {
        fontFamily: {
            primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            mono: 'Consolas, Monaco, "Courier New", monospace'
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
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75
        },
        letterSpacing: {
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em'
        }
    },
    spacing: {
        contentWidth: '1100px',
        contentPadding: '24px',
        mainPaddingTop: '100px',
        sidebarWidth: '280px',
        sidebarSpacing: '32px',
        gap: {
            grid: '48px',
            articles: '28px',
            sidebar: '24px',
            navigation: '20px',
            form: '16px'
        },
        padding: {
            card: '24px',
            section: '32px',
            container: '24px'
        },
        margin: {
            section: '48px',
            element: '24px',
            small: '16px'
        },
        container: {
            maxWidth: '1100px',
            padding: {
                desktop: '24px',
                tablet: '20px',
                mobile: '16px'
            }
        }
    },
    borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '50%'
    },
    shadows: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
        md: '0 4px 16px rgba(0, 0, 0, 0.4)',
        lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
        xl: '0 12px 48px rgba(0, 0, 0, 0.6)',
        inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
        glow: '0 0 20px rgba(96, 165, 250, 0.3)'
    },
    transitions: {
        fast: '150ms ease-in-out',
        normal: '250ms ease-in-out',
        slow: '350ms ease-in-out',
        bounce: '300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
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
            sm: '4px',
            md: '8px',
            lg: '16px'
        },
        glow: {
            primary: `0 0 40px rgba(96, 165, 250, 1.0)`,
            secondary: `0 0 32px rgba(56, 189, 248, 0.8)`,
            moonlight: `0 0 50px rgba(96, 165, 250, 0.6), 0 0 100px rgba(56, 189, 248, 0.3)`
        }
    },
    animations: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.3s ease-out',
        bounce: 'bounce 0.6s ease-in-out',
        glow: 'glow 2s ease-in-out infinite alternate'
    },
    layout: {
        header: {
            height: '80px',
            background: 'rgba(10, 10, 15, 0.95)',
            border: 'rgba(96, 165, 250, 0.2)',
            backdropFilter: 'blur(10px)'
        },
        sidebar: {
            width: '280px',
            background: 'transparent',
            border: 'rgba(96, 165, 250, 0.2)',
            padding: '32px'
        },
        main: {
            padding: '32px',
            gap: '32px'
        },
        footer: {
            background: 'rgba(10, 10, 15, 0.8)',
            border: 'rgba(96, 165, 250, 0.2)',
            padding: '24px'
        },
        container: {
            maxWidth: '1100px',
            padding: '0 24px'
        }
    },
    components: {
        card: {
            background: 'transparent',
            hover: 'rgba(96, 165, 250, 0.1)',
            border: 'rgba(96, 165, 250, 0.4)',
            radius: '16px',
            padding: '24px',
            shadow: '0 8px 32px rgba(96, 165, 250, 0.15)',
            moonlight: `
                radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.12) 0%, transparent 60%),
                radial-gradient(circle at 70% 70%, rgba(56, 189, 248, 0.08) 0%, transparent 60%)
            `
        },
        button: {
            radius: '12px',
            padding: '12px 24px',
            fontWeight: 500,
            transition: '250ms ease-in-out'
        },
        input: {
            background: 'rgba(51, 65, 85, 0.6)',
            border: 'rgba(148, 163, 184, 0.2)',
            focus: 'rgba(96, 165, 250, 0.4)',
            radius: '12px',
            padding: '12px 16px'
        },
        modal: {
            background: 'rgba(30, 41, 59, 0.95)',
            border: 'rgba(148, 163, 184, 0.2)',
            radius: '20px',
            shadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)'
        },
        tooltip: {
            background: 'rgba(51, 65, 85, 0.9)',
            color: '#E2E8F0',
            radius: '8px',
            shadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
        }
    },
    customProperties: {
        // 夜幕主题特有的CSS变量
        '--night-moonlight': '0 0 50px rgba(96, 165, 250, 0.6), 0 0 100px rgba(56, 189, 248, 0.3)',
        '--night-surface': 'transparent',
        '--night-surface-hover': 'rgba(96, 165, 250, 0.1)',
        '--night-border': 'rgba(96, 165, 250, 0.4)',
        '--night-text': '#E2E8F0',
        '--night-text-muted': '#94A3B8',
        '--night-accent': '#60A5FA',
        '--night-backdrop': 'blur(10px)',
        '--night-crystal': `
            radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(56, 189, 248, 0.08) 0%, transparent 60%)
        `,
        '--night-glow-enhanced': '0 0 40px rgba(96, 165, 250, 1.0)'
    }
}
