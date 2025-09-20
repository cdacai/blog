// 方案8：赛博朋克风格
export const theme8 = {
    name: '赛博',
    colors: {
        primary: '#FF073A',
        background: '#0a0a0a',
        text: {
            primary: '#00FFFF',
            secondary: '#FF073A',
            meta: '#00FFAA', // 改为更清晰的青绿色，在黑色背景下更易读
            code: '#00FF41',
            accent: '#FF073A'
        },
        nav: {
            inactive: 'rgba(0, 255, 255, 0.6)',
            hover: 'rgba(255, 7, 58, 0.9)',
            active: '#FF073A',
            background: 'rgba(10, 10, 10, 0.95)',
            blur: '32px'
        },
        card: {
            background: 'rgba(20, 20, 30, 0.85)',
            hover: 'rgba(30, 30, 45, 0.95)',
            border: 'rgba(255, 7, 58, 0.3)',
            glow: '0 0 20px rgba(255, 7, 58, 0.4)'
        },
        sidebar: {
            background: 'rgba(15, 15, 25, 0.8)',
            hover: 'rgba(25, 25, 35, 0.9)',
            border: 'rgba(0, 255, 255, 0.2)',
            glow: '0 0 15px rgba(0, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(255, 7, 58, 0.1)'
        },
        divider: 'rgba(255, 7, 58, 0.2)',
        states: {
            hover: {
                primary: 'rgba(255, 7, 58, 0.9)',
                text: '#00FFFF',
                background: 'rgba(30, 30, 45, 0.95)'
            },
            active: {
                primary: '#FF073A',
                text: '#00FFFF',
                background: 'rgba(40, 40, 55, 1)'
            },
            disabled: {
                primary: 'rgba(255, 7, 58, 0.3)',
                text: 'rgba(0, 255, 255, 0.4)',
                background: 'rgba(20, 20, 30, 0.3)'
            }
        },
        gradients: {
            primary: 'linear-gradient(135deg, #FF073A 0%, #8B5CF6 50%, #00FFFF 100%)',
            background: {
                color: '#0a0a0a',
                image: `linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 25%, #0a1a2a 50%, #1a0a1a 75%, #0a0a0a 100%),
                        radial-gradient(circle at 20% 80%, rgba(255, 7, 58, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
                        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.cyber-grid{fill:none;stroke:%23ff073a;stroke-width:0.5;stroke-opacity:0.1}.cyber-dots{fill:%2300ffff;fill-opacity:0.2}%3C/style%3E%3Cdefs%3E%3Cpattern id='cyberGrid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath class='cyber-grid' d='M 20 0 L 0 0 0 20'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='60' height='60' fill='url(%23cyberGrid)'/%3E%3Ccircle class='cyber-dots' cx='10' cy='10' r='1'/%3E%3Ccircle class='cyber-dots' cx='30' cy='30' r='1'/%3E%3Ccircle class='cyber-dots' cx='50' cy='50' r='1'/%3E%3Cpath class='cyber-grid' d='M0,30 L60,30 M30,0 L30,60'/%3E%3C/svg%3E")`
            },
            card: 'linear-gradient(145deg, rgba(20, 20, 30, 0.9) 0%, rgba(30, 30, 45, 0.8) 100%)',
            overlay: 'linear-gradient(135deg, rgba(255, 7, 58, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(0, 255, 255, 0.05) 100%)'
        }
    },
    typography: {
        fontFamily: {
            primary: "'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', monospace",
            secondary: "'Orbitron', 'Arial', sans-serif",
            code: "'Fira Code', 'JetBrains Mono', monospace"
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
            normal: 1.5,
            relaxed: 1.75
        },
        letterSpacing: {
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.1em'
        }
    },
    spacing: {
        headerHeight: '64px',
        headerTop: '32px',
        headerPadding: '0 32px',
        contentWidth: '1200px',          // 调大到1200px，比其他主题稍宽
        contentPadding: '32px',
        mainPaddingTop: '120px',
        sidebarWidth: '280px',
        sidebarSpacing: '36px',
        gap: {
            grid: '64px',                // 参照其他主题设置
            articles: '36px',
            nav: '48px',
            meta: '18px',
            social: '24px'
        },
        padding: {
            card: '32px 36px',
            sidebar: '32px',
            content: '32px',
            nav: '16px 28px',
            meta: '10px 18px'
        },
        margin: {
            sectionTitle: '32px',
            articleTitle: '18px',
            articleMeta: '14px',
            articleDesc: '18px',
            sidebarSection: '32px',
            categoryItem: '14px'
        },
        sections: {
            aboutMarginBottom: '32px',
            categoriesMarginTop: '32px',
            articleFooterSpacing: '28px'
        },
        divider: {
            margin: '32px 0',
            opacity: '0.08'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1200px',
            padding: {
                desktop: '32px',
                tablet: '28px',
                mobile: '20px'
            }
        },
        article: {
            spacing: {
                between: '36px',
                meta: '14px',
                title: '18px',
                description: '18px',
                footer: '24px'
            },
            padding: {
                desktop: '32px 36px',
                tablet: '28px 32px',
                mobile: '22px 28px'
            }
        },
        sidebar: {
            spacing: {
                section: '32px',
                item: '12px',
                title: '18px'
            }
        }
    },
    borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '50%'
    },
    shadows: {
        sm: '0 2px 8px rgba(255, 7, 58, 0.1)',
        md: '0 4px 16px rgba(255, 7, 58, 0.15)',
        lg: '0 8px 32px rgba(255, 7, 58, 0.2)',
        xl: '0 16px 48px rgba(255, 7, 58, 0.25)',
        glow: '0 0 20px rgba(0, 255, 255, 0.3)',
        innerGlow: 'inset 0 0 20px rgba(255, 7, 58, 0.1)'
    },
    transitions: {
        fast: '150ms ease-out',
        normal: '300ms ease-out',
        slow: '500ms ease-out',
        bounce: '300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
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
            maxWidth: '900px',
            padding: '2rem'
        },
        header: {
            height: '80px',
            position: 'fixed',
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(32px)',
            borderBottom: '1px solid rgba(255, 7, 58, 0.2)'
        },
        sidebar: {
            width: '320px',
            background: 'rgba(15, 15, 25, 0.8)',
            backdropFilter: 'blur(20px)'
        },
        main: {
            padding: '2rem',
            minHeight: 'calc(100vh - 80px)'
        }
    },
    components: {
        button: {
            variants: {
                primary: {
                    background: 'linear-gradient(135deg, #FF073A 0%, #8B5CF6 100%)',
                    color: '#00FFFF',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(255, 7, 58, 0.3)',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    hover: {
                        transform: 'translateY(-3px)',
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #00FFFF 100%)',
                        boxShadow: '0 8px 24px rgba(255, 7, 58, 0.4)',
                        filter: 'brightness(1.2)'
                    }
                },
                secondary: {
                    background: 'rgba(20, 20, 30, 0.8)',
                    color: '#00FFFF',
                    border: '2px solid rgba(0, 255, 255, 0.3)',
                    backdropFilter: 'blur(20px)',
                    hover: {
                        background: 'rgba(30, 30, 45, 0.9)',
                        borderColor: 'rgba(255, 7, 58, 0.5)',
                        color: '#FF073A',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 0 20px rgba(255, 7, 58, 0.4)'
                    }
                },
                ghost: {
                    background: 'transparent',
                    color: '#00FFFF',
                    border: '1px solid rgba(0, 255, 255, 0.2)',
                    hover: {
                        background: 'rgba(0, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 7, 58, 0.3)',
                        color: '#FF073A',
                        boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
                    }
                }
            }
        },
        card: {
            variants: {
                default: {
                    background: 'rgba(20, 20, 30, 0.85)',
                    border: '1px solid rgba(255, 7, 58, 0.2)',
                    borderRadius: '1rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(255, 7, 58, 0.1)',
                    hover: {
                        transform: 'translateY(-5px)',
                        background: 'rgba(30, 30, 45, 0.95)',
                        boxShadow: '0 16px 48px rgba(255, 7, 58, 0.2)',
                        borderColor: 'rgba(0, 255, 255, 0.4)'
                    }
                },
                featured: {
                    background: 'linear-gradient(145deg, rgba(20, 20, 30, 0.9) 0%, rgba(30, 30, 45, 0.8) 100%)',
                    border: '2px solid rgba(255, 7, 58, 0.4)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 0 30px rgba(255, 7, 58, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
                        animation: 'cyber-shine 3s infinite'
                    }
                }
            }
        },
        input: {
            background: 'rgba(20, 20, 30, 0.8)',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            color: '#00FFFF',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            placeholder: {
                color: 'rgba(0, 255, 255, 0.5)'
            },
            focus: {
                borderColor: 'rgba(255, 7, 58, 0.6)',
                boxShadow: '0 0 0 4px rgba(255, 7, 58, 0.15), 0 0 20px rgba(0, 255, 255, 0.3)',
                background: 'rgba(30, 30, 45, 0.9)',
                outline: 'none'
            }
        }
    },
    animations: {
        keyframes: {
            'cyber-glow': {
                '0%, 100%': {
                    textShadow: '0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3), 0 0 15px rgba(0, 255, 255, 0.2)'
                },
                '50%': {
                    textShadow: '0 0 10px rgba(255, 7, 58, 0.8), 0 0 20px rgba(255, 7, 58, 0.5), 0 0 30px rgba(255, 7, 58, 0.3)'
                }
            },
            'cyber-pulse': {
                '0%, 100%': {
                    boxShadow: '0 0 5px rgba(255, 7, 58, 0.3)'
                },
                '50%': {
                    boxShadow: '0 0 20px rgba(255, 7, 58, 0.6), 0 0 30px rgba(0, 255, 255, 0.3)'
                }
            },
            'cyber-shine': {
                '0%': {
                    transform: 'translateX(-100%)'
                },
                '100%': {
                    transform: 'translateX(100%)'
                }
            },
            'cyber-flicker': {
                '0%, 100%': {
                    opacity: 1
                },
                '50%': {
                    opacity: 0.8
                },
                '75%': {
                    opacity: 0.9
                }
            }
        },
        durations: {
            glow: '2s infinite alternate',
            pulse: '1.5s infinite',
            shine: '3s infinite',
            flicker: '0.5s infinite'
        }
    },
    effects: {
        neonGlow: {
            textShadow: '0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3)',
            animation: 'cyber-glow 2s infinite alternate'
        },
        hologramShimmer: {
            background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'cyber-shine 3s infinite'
        },
        glitchBorder: {
            border: '2px solid rgba(255, 7, 58, 0.6)',
            position: 'relative',
            '::before': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                background: 'linear-gradient(45deg, #FF073A, #8B5CF6, #00FFFF, #FF073A)',
                borderRadius: 'inherit',
                zIndex: -1,
                filter: 'blur(6px)',
                animation: 'cyber-pulse 1.5s infinite'
            }
        }
    },
    customProperties: {
        // CSS自定义属性，用于动态主题切换
        '--cyber-primary': '#FF073A',
        '--cyber-secondary': '#00FFFF',
        '--cyber-accent': '#8B5CF6',
        '--cyber-bg': '#0a0a0a',
        '--cyber-surface': 'rgba(20, 20, 30, 0.85)',
        '--cyber-glow-primary': 'rgba(255, 7, 58, 0.3)',
        '--cyber-glow-secondary': 'rgba(0, 255, 255, 0.3)',
        '--cyber-text': '#00FFFF',
        '--cyber-text-muted': 'rgba(0, 255, 255, 0.7)'
    }
}
