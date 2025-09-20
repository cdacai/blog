// 方案7：未来科技风格
export const theme7 = {
    name: '翡翠',
    colors: {
        primary: '#00E5A0',
        background: '#1a4731',
        text: {
            primary: '#E0FFF4',
            secondary: '#A0E7CC',
            meta: '#68D391',
            code: '#9AE6B4',
            accent: '#00E5A0'
        },
        nav: {
            inactive: 'rgba(160, 231, 204, 0.6)',
            hover: 'rgba(0, 229, 160, 0.9)',
            active: '#00E5A0',
            background: 'rgba(26, 71, 49, 0.95)',
            blur: '24px'
        },
        card: {
            background: 'rgba(38, 103, 73, 0.8)',
            hover: 'rgba(38, 103, 73, 0.95)',
            border: 'rgba(0, 229, 160, 0.2)',
            glow: '0 0 40px rgba(0, 229, 160, 0.12)'
        },
        sidebar: {
            background: 'transparent',
            hover: 'transparent',
            border: 'rgba(0, 229, 160, 0.1)',
            glow: 'none',
            boxShadow: 'none'
        },
        divider: 'rgba(0, 229, 160, 0.1)',
        states: {
            hover: {
                primary: 'rgba(0, 229, 160, 0.9)',
                text: '#E0FFF4',
                background: 'rgba(38, 103, 73, 0.95)'
            },
            active: {
                primary: '#00E5A0',
                text: '#E0FFF4',
                background: 'rgba(38, 103, 73, 1)'
            },
            disabled: {
                primary: 'rgba(0, 229, 160, 0.3)',
                text: 'rgba(224, 255, 244, 0.4)',
                background: 'rgba(38, 103, 73, 0.3)'
            }
        },
        social: {
            github: '#24292e',
            twitter: '#1da1f2',
            facebook: '#1877f2',
            linkedin: '#0a66c2'
        },
        gradients: {
            primary: 'linear-gradient(135deg, #00E5A0 0%, #00C896 50%, #00B087 100%)',
            background: {
                color: '#1a4731',
                image: `linear-gradient(180deg, #1a4731 0%, #2d5a3d 100%),url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%2300e5a0;fill-opacity:0.06}%3C/style%3E%3Crect width='48' height='48' fill='none'/%3E%3Cpath class='pattern' d='M0 0h48v1H0zM0 12h48v1H0zM0 24h48v1H0zM0 36h48v1H0zM0 0h1v48H0zM12 0h1v48h-1zM24 0h1v48h-1zM36 0h1v48h-1z'/%3E%3Ccircle class='pattern' cx='6' cy='6' r='1'/%3E%3Ccircle class='pattern' cx='18' cy='18' r='1'/%3E%3Ccircle class='pattern' cx='30' cy='30' r='1'/%3E%3Ccircle class='pattern' cx='42' cy='42' r='1'/%3E%3C/svg%3E")`,
                repeat: 'repeat',
                position: 'center',
                size: '48px'
            },
            card: 'none',
            text: 'linear-gradient(90deg, #00E5A0 0%, #68D391 100%)',
            border: 'linear-gradient(135deg, rgba(0, 229, 160, 0.4) 0%, rgba(0, 229, 160, 0.1) 100%)',
            glow: 'linear-gradient(135deg, rgba(0, 229, 160, 0.3) 0%, rgba(104, 211, 145, 0.1) 100%)'
        },
        variants: {
            primaryLight: 'rgba(0, 229, 160, 0.15)',
            primaryDark: 'rgba(0, 229, 160, 0.9)',
            textLight: 'rgba(224, 255, 244, 0.1)',
            textDark: 'rgba(224, 255, 244, 0.9)',
            glass: 'rgba(38, 103, 73, 0.8)'
        },
        semantic: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        }
    },
    spacing: {
        headerHeight: '60px',
        headerTop: '28px',
        headerPadding: '0 28px',
        contentWidth: '1120px',
        contentPadding: '28px',
        mainPaddingTop: '110px',
        sidebarWidth: '320px',
        sidebarSpacing: '36px',
        gap: {
            grid: '72px',
            articles: '44px',
            nav: '52px',
            meta: '18px',
            social: '24px'
        },
        padding: {
            card: '36px 44px',
            sidebar: '36px',
            content: '28px',
            nav: '18px 28px',
            meta: '10px 18px'
        },
        margin: {
            sectionTitle: '36px',
            articleTitle: '18px',
            articleMeta: '14px',
            articleDesc: '18px',
            sidebarSection: '36px',
            categoryItem: '14px'
        },
        sections: {
            aboutMarginBottom: '36px',
            categoriesMarginTop: '36px',
            articleFooterSpacing: '28px'
        },
        divider: {
            margin: '36px 0',
            opacity: '0.08'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1120px',
            padding: {
                desktop: '36px',
                tablet: '28px',
                mobile: '18px'
            }
        },
        article: {
            spacing: {
                between: '44px',
                meta: '14px',
                title: '18px',
                description: '18px',
                footer: '24px'
            },
            padding: {
                desktop: '36px 44px',
                tablet: '28px 36px',
                mobile: '22px 28px'
            }
        },
        sidebar: {
            spacing: {
                section: '36px',
                item: '10px',
                title: '18px'
            }
        },
        presets: {
            compact: {
                card: '18px',
                container: '18px',
                section: '28px'
            },
            normal: {
                card: '28px',
                container: '36px',
                section: '52px'
            },
            relaxed: {
                card: '36px',
                container: '52px',
                section: '72px'
            }
        }
    },
    typography: {
        logo: {
            size: '26px',
            weight: '700',
            spacing: '-0.03em',
            gradient: 'var(--theme-gradients-text)'
        },
        nav: {
            size: '15px',
            spacing: '0.03em',
            weight: '600',
            transform: 'uppercase'
        },
        title: {
            size: '32px',
            lineHeight: '1.3',
            weight: '700',
            spacing: '-0.02em',
            gradient: 'var(--theme-gradients-text)'
        },
        sectionTitle: {
            size: '24px',
            weight: '500',
            spacing: '-0.025em',
            marginBottom: '28px',
            gradient: 'var(--theme-gradients-text)'
        },
        meta: {
            size: '15px',
            spacing: '0.025em',
            weight: '500'
        },
        description: {
            size: '17px',
            lineHeight: '1.8',
            spacing: '0.015em',
            weight: '400'
        },
        footer: {
            size: '16px',
            spacing: '0.025em',
            weight: '500'
        },
        sidebar: {
            title: {
                size: '1.2rem',
                weight: '650',
                spacing: '0.015em'
            },
            text: {
                size: '1.05rem',
                lineHeight: '1.9',
                spacing: '0.015em'
            },
            category: {
                size: '1.05rem',
                spacing: '0.015em'
            },
            count: {
                size: '0.95rem',
                lineHeight: '1.6'
            },
            categories: {
                title: {},
                item: {
                    name: {}
                }
            }
        },
        link: {
            size: '17px',
            weight: '650',
            decoration: 'none',
            hover: {
                color: 'var(--theme-text-accent)',
                decoration: 'none'
            }
        },
        article: {
            title: {
                size: '40px',
                lineHeight: '1.15',
                weight: '900',
                spacing: '-0.04em',
                decoration: 'none',
                color: '#E0FFF4',
                textShadow: '0 0 20px rgba(0, 229, 160, 0.5)',
                hover: {
                    transform: 'translateY(-4px)',
                    decoration: 'none',
                    color: '#00E5A0',
                    textShadow: '0 0 30px rgba(0, 229, 160, 0.8)'
                }
            },
            meta: {
                size: '16px',
                spacing: '0.04em',
                weight: '600',
                color: '#A0E7CC',
                textShadow: '0 0 10px rgba(0, 229, 160, 0.3)'
            },
            description: {
                size: '18px',
                lineHeight: '1.75',
                spacing: '0.03em',
                weight: '400',
                color: '#C6F6D5',
                textShadow: '0 0 8px rgba(0, 229, 160, 0.2)'
            },
            category: {
                size: '16px',
                weight: '800',
                spacing: '0.04em',
                transform: 'uppercase',
                gradient: 'var(--theme-gradients-text)',
                hover: {
                    opacity: '0.95'
                }
            }
        },
        base: {
            family: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
            size: '18px',
            lineHeight: '1.7',
            weight: '400'
        },
        headings: {
            h1: {
                size: '36px',
                lineHeight: '1.1',
                weight: 'bold',
                spacing: '-0.025em',
                marginBottom: '28px'
            },
            h2: {
                size: '28px',
                lineHeight: '1.2',
                weight: '650',
                spacing: '-0.015em',
                marginBottom: '24px'
            },
            h3: {
                size: '22px',
                lineHeight: '1.3',
                weight: '650',
                spacing: '-0.015em',
                marginBottom: '18px'
            }
        },
        variants: {
            mono: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
            serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
            sans: 'Inter, system-ui, sans-serif'
        },
        presets: {
            title: {
                large: {
                    size: '44px',
                    lineHeight: '1.1',
                    weight: '900',
                    spacing: '-0.04em'
                },
                medium: {
                    size: '36px',
                    lineHeight: '1.2',
                    weight: '800',
                    spacing: '-0.025em'
                },
                small: {
                    size: '28px',
                    lineHeight: '1.3',
                    weight: '700',
                    spacing: '-0.015em'
                }
            },
            text: {
                large: {
                    size: '22px',
                    lineHeight: '1.7',
                    weight: '400'
                },
                medium: {
                    size: '18px',
                    lineHeight: '1.7',
                    weight: '400'
                },
                small: {
                    size: '16px',
                    lineHeight: '1.6',
                    weight: '400'
                },
                tiny: {
                    size: '14px',
                    lineHeight: '1.6',
                    weight: '400'
                }
            }
        }
    },
    borderRadius: {
        card: '24px',
        button: '16px',
        tag: '12px',
        image: '20px',
        input: '14px'
    },
    shadows: {
        card: '0 8px 32px rgba(0, 229, 160, 0.08), 0 16px 64px rgba(0, 229, 160, 0.04)',
        hover: '0 16px 48px rgba(0, 229, 160, 0.12), 0 24px 80px rgba(0, 229, 160, 0.06)',
        dropdown: '0 8px 24px rgba(0, 229, 160, 0.08)',
        button: '0 4px 16px rgba(0, 229, 160, 0.2)',
        focus: '0 0 0 4px rgba(0, 229, 160, 0.2)'
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-3px)',
                medium: 'translateY(-5px)',
                large: 'translateY(-8px)'
            },
            shadow: {
                subtle: '0 8px 24px rgba(0, 229, 160, 0.06)',
                medium: '0 12px 36px rgba(0, 229, 160, 0.08)',
                large: '0 16px 48px rgba(0, 229, 160, 0.1)'
            },
            glow: {
                subtle: '0 0 20px rgba(0, 229, 160, 0.4)',
                medium: '0 0 30px rgba(0, 229, 160, 0.6)',
                large: '0 0 40px rgba(0, 229, 160, 0.8)'
            }
        },
        transition: {
            default: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            smooth: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },
    motion: {
        duration: {
            instant: '0.12s',
            fast: '0.4s',
            normal: '0.5s',
            slow: '0.7s',
            slower: '0.9s'
        },
        easing: {
            linear: 'linear',
            ease: 'ease',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },
    components: {
        card: {
            variants: {
                elevated: {
                    background: 'rgba(38, 103, 73, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 229, 160, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        transform: 'translateY(-5px)',
                        background: 'rgba(38, 103, 73, 0.95)',
                        boxShadow: '0 16px 48px rgba(0, 229, 160, 0.12)',
                        borderColor: 'rgba(0, 229, 160, 0.4)'
                    }
                }
            }
        },
        button: {
            variants: {
                solid: {
                    background: 'linear-gradient(135deg, #00E5A0 0%, #00C896 100%)',
                    color: '#1A4731',
                    border: 'none',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(26, 71, 49, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        background: 'linear-gradient(135deg, #00C896 0%, #00B087 100%)',
                        boxShadow: '0 8px 24px rgba(0, 229, 160, 0.3)',
                        filter: 'brightness(1.1)'
                    }
                },
                outline: {
                    background: 'transparent',
                    color: '#00E5A0',
                    border: '2px solid currentColor',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        background: 'rgba(0, 229, 160, 0.1)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 0 20px rgba(0, 229, 160, 0.4)'
                    }
                }
            }
        },
        input: {
            background: 'rgba(38, 103, 73, 0.8)',
            border: '1px solid rgba(0, 229, 160, 0.3)',
            color: '#E0FFF4',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            focus: {
                border: '1px solid rgba(0, 229, 160, 0.8)',
                boxShadow: '0 0 0 4px rgba(0, 229, 160, 0.15)',
                background: 'rgba(38, 103, 73, 0.95)'
            }
        }
    }
}