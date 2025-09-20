// 方案9：二次元风格
export const theme9 = {
    name: '二次元',
    colors: {
        primary: '#FF6B9D',
        background: '#FDF2F8',
        text: {
            primary: '#2D1B69',
            secondary: '#FF6B9D',
            meta: '#8B5FBF',
            code: '#FF9A8B',
            accent: '#FF6B9D'
        },
        nav: {
            inactive: 'rgba(139, 95, 191, 0.6)',
            hover: 'rgba(255, 107, 157, 0.9)',
            active: '#FF6B9D',
            background: 'rgba(253, 242, 248, 0.95)',
            blur: '20px'
        },
        card: {
            background: 'rgba(255, 255, 255, 0.9)',
            hover: 'rgba(255, 255, 255, 0.95)',
            border: 'transparent',                        // 二次元主题使用透明边框
            glow: '0 0 30px rgba(255, 107, 157, 0.15)'
        },
        sidebar: {
            background: 'rgba(255, 255, 255, 0.85)',
            hover: 'rgba(255, 255, 255, 0.95)',
            border: 'transparent',                        // 二次元主题使用透明边框
            glow: '0 0 20px rgba(255, 107, 157, 0.1)',
            boxShadow: '0 8px 32px rgba(255, 107, 157, 0.08)'
        },
        divider: 'rgba(255, 107, 157, 0.15)',
        states: {
            hover: {
                primary: 'rgba(255, 107, 157, 0.9)',
                text: '#2D1B69',
                background: 'rgba(255, 255, 255, 0.95)'
            },
            active: {
                primary: '#FF6B9D',
                text: '#2D1B69',
                background: 'rgba(255, 255, 255, 1)'
            },
            disabled: {
                primary: 'rgba(255, 107, 157, 0.3)',
                text: 'rgba(45, 27, 105, 0.4)',
                background: 'rgba(255, 255, 255, 0.3)'
            }
        },
        gradients: {
            primary: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 50%, #60A5FA 100%)',
            background: {
                color: '#FDF2F8',
                image: `linear-gradient(135deg, #FDF2F8 0%, #FAE8FF 25%, #EBF8FF 50%, #F0F9FF 75%, #FDF2F8 100%),
                        radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(192, 132, 252, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.05) 0%, transparent 50%),
                        url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.anime-pattern{fill:%23ff6b9d;fill-opacity:0.03}.anime-dots{fill:%23c084fc;fill-opacity:0.05}%3C/style%3E%3Cdefs%3E%3Cpattern id='animePattern' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Ccircle class='anime-dots' cx='5' cy='5' r='1.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='40' height='40' fill='url(%23animePattern)'/%3E%3Cpath class='anime-pattern' d='M0,20 Q10,10 20,20 T40,20 Q30,30 20,20 T0,20Z'/%3E%3C/svg%3E")`
            },
            card: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 242, 248, 0.9) 100%)',
            overlay: 'linear-gradient(135deg, rgba(255, 107, 157, 0.03) 0%, rgba(192, 132, 252, 0.03) 50%, rgba(96, 165, 250, 0.03) 100%)'
        }
    },
    typography: {
        fontFamily: {
            primary: "'Comic Neue', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
            secondary: "'Cute Font', 'KaiTi', serif",
            code: "'Cascadia Code', 'Consolas', monospace"
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
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800
        },
        lineHeight: {
            tight: 1.25,
            normal: 1.6,
            relaxed: 1.8
        },
        letterSpacing: {
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em'
        }
    },
    spacing: {
        headerHeight: '70px',
        headerTop: '24px',
        headerPadding: '0 32px',
        contentWidth: '1200px',
        contentPadding: '32px',
        mainPaddingTop: '100px',
        sidebarWidth: '300px',
        sidebarSpacing: '32px',
        gap: {
            grid: '60px',
            articles: '32px',
            nav: '40px',
            meta: '16px',
            social: '20px'
        },
        padding: {
            card: '28px 32px',
            sidebar: '28px',
            content: '28px',
            nav: '14px 24px',
            meta: '8px 14px'
        },
        margin: {
            sectionTitle: '28px',
            articleTitle: '16px',
            articleMeta: '12px',
            articleDesc: '16px',
            sidebarSection: '28px',
            categoryItem: '12px'
        },
        sections: {
            aboutMarginBottom: '28px',
            categoriesMarginTop: '28px',
            articleFooterSpacing: '24px'
        },
        divider: {
            margin: '28px 0',
            opacity: '0.1'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80]
        },
        container: {
            maxWidth: '1200px',
            padding: {
                desktop: '32px',
                tablet: '24px',
                mobile: '20px'
            }
        },
        article: {
            spacing: {
                between: '32px',
                meta: '12px',
                title: '16px',
                description: '16px',
                footer: '20px'
            },
            padding: {
                desktop: '28px 32px',
                tablet: '24px 28px',
                mobile: '20px 24px'
            }
        },
        sidebar: {
            spacing: {
                section: '28px',
                item: '10px',
                title: '16px'
            }
        }
    },
    borderRadius: {
        none: '0',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        full: '50%'
    },
    shadows: {
        sm: '0 2px 8px rgba(255, 107, 157, 0.08)',
        md: '0 4px 16px rgba(255, 107, 157, 0.12)',
        lg: '0 8px 32px rgba(255, 107, 157, 0.15)',
        xl: '0 16px 48px rgba(255, 107, 157, 0.18)',
        glow: '0 0 20px rgba(255, 107, 157, 0.25)',
        innerGlow: 'inset 0 0 20px rgba(255, 107, 157, 0.08)'
    },
    transitions: {
        fast: '200ms ease-out',
        normal: '300ms ease-out',
        slow: '500ms ease-out',
        bounce: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
    },
    breakpoints: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },
    layout: {
        container: {
            maxWidth: '1200px',
            padding: '2rem'
        },
        header: {
            height: '70px',
            position: 'fixed',
            background: 'rgba(253, 242, 248, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 107, 157, 0.15)'
        },
        sidebar: {
            width: '300px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(15px)'
        },
        main: {
            padding: '2rem',
            minHeight: 'calc(100vh - 70px)'
        }
    },
    components: {
        button: {
            variants: {
                primary: {
                    background: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(255, 107, 157, 0.25)',
                    textShadow: 'none',
                    hover: {
                        transform: 'translateY(-2px)',
                        background: 'linear-gradient(135deg, #C084FC 0%, #60A5FA 100%)',
                        boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
                        filter: 'brightness(1.1)'
                    }
                },
                secondary: {
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#FF6B9D',
                    border: '2px solid rgba(255, 107, 157, 0.3)',
                    backdropFilter: 'blur(15px)',
                    hover: {
                        background: 'rgba(253, 242, 248, 0.95)',
                        borderColor: 'rgba(255, 107, 157, 0.6)',
                        color: '#2D1B69',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 0 20px rgba(255, 107, 157, 0.2)'
                    }
                },
                cute: {
                    background: 'linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 100%)',
                    color: '#FF6B9D',
                    border: '2px solid rgba(255, 107, 157, 0.2)',
                    borderRadius: '2rem',
                    hover: {
                        background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: '0 8px 25px rgba(255, 107, 157, 0.3)'
                    }
                }
            }
        },
        card: {
            variants: {
                default: {
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 107, 157, 0.15)',
                    borderRadius: '1.25rem',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 8px 32px rgba(255, 107, 157, 0.08)',
                    hover: {
                        transform: 'translateY(-4px)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 16px 48px rgba(255, 107, 157, 0.12)',
                        borderColor: 'rgba(255, 107, 157, 0.25)'
                    }
                },
                kawaii: {
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 245, 0.9) 100%)',
                    border: '2px solid rgba(255, 107, 157, 0.2)',
                    borderRadius: '2rem',
                    boxShadow: '0 0 30px rgba(255, 107, 157, 0.15), inset 0 0 20px rgba(255, 182, 193, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 107, 157, 0.15), transparent)',
                        animation: 'kawaii-shine 3s infinite'
                    }
                }
            }
        },
        input: {
            background: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid rgba(255, 107, 157, 0.2)',
            color: '#2D1B69',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            placeholder: {
                color: 'rgba(139, 95, 191, 0.6)'
            },
            focus: {
                borderColor: 'rgba(255, 107, 157, 0.5)',
                boxShadow: '0 0 0 4px rgba(255, 107, 157, 0.1), 0 0 20px rgba(255, 107, 157, 0.15)',
                background: 'rgba(255, 255, 255, 0.95)',
                outline: 'none'
            }
        }
    },
    animations: {
        keyframes: {
            'kawaii-bounce': {
                '0%, 100%': {
                    transform: 'translateY(0) scale(1)',
                    animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
                },
                '50%': {
                    transform: 'translateY(-5px) scale(1.02)',
                    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
                }
            },
            'kawaii-pulse': {
                '0%, 100%': {
                    boxShadow: '0 0 10px rgba(255, 107, 157, 0.3)'
                },
                '50%': {
                    boxShadow: '0 0 25px rgba(255, 107, 157, 0.5), 0 0 35px rgba(192, 132, 252, 0.3)'
                }
            },
            'kawaii-shine': {
                '0%': {
                    transform: 'translateX(-100%)'
                },
                '100%': {
                    transform: 'translateX(100%)'
                }
            },
            'kawaii-float': {
                '0%, 100%': {
                    transform: 'translateY(0px)',
                    opacity: 1
                },
                '50%': {
                    transform: 'translateY(-10px)',
                    opacity: 0.8
                }
            }
        },
        durations: {
            bounce: '2s infinite',
            pulse: '2s infinite',
            shine: '3s infinite',
            float: '3s infinite ease-in-out'
        }
    },
    effects: {
        kawaiiBounce: {
            animation: 'kawaii-bounce 2s infinite'
        },
        sweetGlow: {
            textShadow: '0 0 10px rgba(255, 107, 157, 0.4), 0 0 20px rgba(255, 107, 157, 0.2)',
            animation: 'kawaii-pulse 2s infinite'
        },
        magicalShimmer: {
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 107, 157, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'kawaii-shine 3s infinite'
        },
        floatingElement: {
            animation: 'kawaii-float 3s infinite ease-in-out'
        }
    },
    customProperties: {
        // CSS自定义属性，用于动态主题切换
        '--anime-primary': '#FF6B9D',
        '--anime-secondary': '#C084FC',
        '--anime-accent': '#60A5FA',
        '--anime-bg': '#FDF2F8',
        '--anime-surface': 'rgba(255, 255, 255, 0.9)',
        '--anime-glow-primary': 'rgba(255, 107, 157, 0.3)',
        '--anime-glow-secondary': 'rgba(192, 132, 252, 0.3)',
        '--anime-text': '#2D1B69',
        '--anime-text-muted': 'rgba(45, 27, 105, 0.7)'
    }
}
