// 方案5：自然风格
export const theme5 = {
    name: '自然',
    colors: {
        primary: '#2F855A',
        background: '#f0f9f4',
        text: {
            primary: '#1a365d',
            secondary: '#2F855A',
            meta: '#64748b',
            code: '#234E52',
            accent: '#38A169'
        },
        nav: {
            inactive: 'rgba(44, 82, 60, 0.8)',
            hover: 'rgba(47, 133, 90, 0.9)',
            active: '#2F855A',
            background: 'rgba(255, 255, 255, 0.95)',
            blur: '20px'
        },
        card: {
            background: '#ffffffd1',
            hover: 'rgba(255, 255, 255, 0.95)',
            border: 'rgba(47, 133, 90, 0.1)',
            glow: '0 0 30px rgba(47, 133, 90, 0.08)'
        },
        divider: 'rgba(47, 133, 90, 0.08)',
        states: {
            hover: {
                primary: 'rgba(47, 133, 90, 0.9)',
                text: '#1A4731',
                background: 'rgba(255, 255, 255, 0.95)'
            },
            active: {
                primary: '#2F855A',
                text: '#1A4731',
                background: 'rgba(255, 255, 255, 1)'
            },
            disabled: {
                primary: 'rgba(47, 133, 90, 0.4)',
                text: 'rgba(26, 71, 49, 0.4)',
                background: 'rgba(255, 255, 255, 0.4)'
            }
        },
        social: {
            github: '#24292e',
            twitter: '#1da1f2',
            facebook: '#1877f2',
            linkedin: '#0a66c2'
        },
        gradients: {
            primary: 'linear-gradient(135deg, #276749 0%, #2F855A 50%, #38A169 100%)',
            background: {
                color: '#8bc594',
                image: `linear-gradient(180deg, #8bc594 0%, #a3d4ab 100%),url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%239ed3a7;fill-opacity:0.8}%3C/style%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath class='pattern' d='M0 0h40v2H0zM0 10h40v2H0zM0 20h40v2H0zM0 30h40v2H0zM0 0h2v40H0zM10 0h2v40h-2zM20 0h2v40h-2zM30 0h2v40h-2z'/%3E%3C/svg%3E")`,
                repeat: 'repeat',
                position: 'center',
                size: '40px'
            },
            card: 'none',
            text: 'linear-gradient(90deg, #1A4731 0%, #276749 100%)',
            border: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
            glow: 'linear-gradient(135deg, rgba(47, 133, 90, 0.25) 0%, rgba(56, 161, 105, 0.1) 100%)'
        },
        variants: {
            primaryLight: 'rgba(47, 133, 90, 0.1)',
            primaryDark: 'rgba(47, 133, 90, 0.9)',
            textLight: 'rgba(26, 71, 49, 0.1)',
            textDark: 'rgba(26, 71, 49, 0.9)',
            glass: 'rgba(255, 255, 255, 0.8)'
        },
        semantic: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        }
    },
    spacing: {
        headerHeight: '56px',
        headerTop: '24px',
        headerPadding: '0 24px',
        contentWidth: '1080px',
        contentPadding: '24px',
        mainPaddingTop: '100px',
        sidebarWidth: '300px',
        sidebarSpacing: '32px',
        gap: {
            grid: '64px',
            articles: '40px',
            nav: '48px',
            meta: '16px',
            social: '20px'
        },
        padding: {
            card: '32px 40px',
            sidebar: '32px',
            content: '24px',
            nav: '16px 24px',
            meta: '8px 16px'
        },
        margin: {
            sectionTitle: '32px',
            articleTitle: '16px',
            articleMeta: '12px',
            articleDesc: '16px',
            sidebarSection: '32px',
            categoryItem: '12px'
        },
        sections: {
            aboutMarginBottom: '32px',
            categoriesMarginTop: '32px',
            articleFooterSpacing: '24px'
        },
        divider: {
            margin: '32px 0',
            opacity: '0.06'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1080px',
            padding: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        article: {
            spacing: {
                between: '40px',
                meta: '12px',
                title: '16px',
                description: '16px',
                footer: '20px'
            },
            padding: {
                desktop: '32px 40px',
                tablet: '24px 32px',
                mobile: '20px 24px'
            }
        },
        sidebar: {
            spacing: {
                section: '32px',
                item: '8px',
                title: '16px'
            }
        },
        presets: {
            compact: {
                card: '16px',
                container: '16px',
                section: '24px'
            },
            normal: {
                card: '24px',
                container: '32px',
                section: '48px'
            },
            relaxed: {
                card: '32px',
                container: '48px',
                section: '64px'
            }
        }
    },
    typography: {
        logo: {
            size: '24px',
            weight: '600',
            spacing: '-0.02em',
            gradient: 'var(--theme-gradients-text)'
        },
        nav: {
            size: '14px',
            spacing: '0.02em',
            weight: '500',
            transform: 'none'
        },
        title: {
            size: '28px',
            lineHeight: '1.4',
            weight: '600',
            spacing: '-0.01em',
            gradient: 'var(--theme-gradients-text)'
        },
        sectionTitle: {
            size: '20px',
            weight: '400',
            spacing: '-0.02em',
            marginBottom: '24px',
            gradient: 'var(--theme-gradients-text)'
        },
        meta: {
            size: '13px',
            spacing: '0.02em',
            weight: '400'
        },
        description: {
            size: '15px',
            lineHeight: '1.7',
            spacing: '0.01em',
            weight: '400'
        },
        footer: {
            size: '14px',
            spacing: '0.02em',
            weight: '400'
        },
        sidebar: {
            title: {
                size: '1.1rem',
                weight: '600',
                spacing: '0.01em'
            },
            text: {
                size: '1rem',
                lineHeight: '1.8',
                spacing: '0.01em'
            },
            category: {
                size: '1rem',
                spacing: '0.01em'
            },
            count: {
                size: '0.9rem',
                lineHeight: '1.5'
            },
            categories: {
                title: {},
                item: {
                    name: {}
                }
            }
        },
        link: {
            size: '16px',
            weight: '600',
            decoration: 'none',
            hover: {
                color: 'var(--theme-text-accent)',
                decoration: 'none'
            }
        },
        article: {
            title: {
                size: '36px',
                lineHeight: '1.2',
                weight: '800',
                spacing: '-0.03em',
                decoration: 'none',
                color: '#F8FAFC',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                hover: {
                    transform: 'translateY(-3px)',
                    decoration: 'none',
                    color: '#FFFFFF'
                }
            },
            meta: {
                size: '15px',
                spacing: '0.03em',
                weight: '500',
                color: '#94A3B8',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            },
            description: {
                size: '17px',
                lineHeight: '1.8',
                spacing: '0.02em',
                weight: '400',
                color: '#CBD5E1',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            },
            category: {
                size: '15px',
                weight: '700',
                spacing: '0.03em',
                transform: 'none',
                gradient: 'var(--theme-gradients-text)',
                hover: {
                    opacity: '0.9'
                }
            }
        },
        base: {
            family: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            size: '17px',
            lineHeight: '1.8',
            weight: '400'
        },
        headings: {
            h1: {
                size: '32px',
                lineHeight: '1.2',
                weight: 'bold',
                spacing: '-0.02em',
                marginBottom: '24px'
            },
            h2: {
                size: '24px',
                lineHeight: '1.3',
                weight: '600',
                spacing: '-0.01em',
                marginBottom: '20px'
            },
            h3: {
                size: '20px',
                lineHeight: '1.4',
                weight: '600',
                spacing: '-0.01em',
                marginBottom: '16px'
            }
        },
        variants: {
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
            sans: 'Plus Jakarta Sans, Inter, system-ui, sans-serif'
        },
        presets: {
            title: {
                large: {
                    size: '40px',
                    lineHeight: '1.2',
                    weight: '800',
                    spacing: '-0.03em'
                },
                medium: {
                    size: '32px',
                    lineHeight: '1.3',
                    weight: '700',
                    spacing: '-0.02em'
                },
                small: {
                    size: '24px',
                    lineHeight: '1.4',
                    weight: '600',
                    spacing: '-0.01em'
                }
            },
            text: {
                large: {
                    size: '20px',
                    lineHeight: '1.6',
                    weight: '400'
                },
                medium: {
                    size: '17px',
                    lineHeight: '1.6',
                    weight: '400'
                },
                small: {
                    size: '15px',
                    lineHeight: '1.5',
                    weight: '400'
                },
                tiny: {
                    size: '13px',
                    lineHeight: '1.5',
                    weight: '400'
                }
            }
        }
    },
    borderRadius: {
        card: '20px',
        button: '12px',
        tag: '8px',
        image: '16px',
        input: '10px'
    },
    shadows: {
        card: '0 4px 20px rgba(26, 71, 49, 0.04), 0 8px 30px rgba(26, 71, 49, 0.02)',
        hover: '0 10px 30px rgba(26, 71, 49, 0.06), 0 15px 40px rgba(26, 71, 49, 0.03)',
        dropdown: '0 4px 12px rgba(26, 71, 49, 0.04)',
        button: '0 2px 8px rgba(47, 133, 90, 0.15)',
        focus: '0 0 0 3px rgba(47, 133, 90, 0.15)'
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-2px)',
                medium: 'translateY(-3px)',
                large: 'translateY(-4px)'
            },
            shadow: {
                subtle: '0 4px 16px rgba(26, 71, 49, 0.03)',
                medium: '0 6px 24px rgba(26, 71, 49, 0.05)',
                large: '0 8px 32px rgba(26, 71, 49, 0.07)'
            }
        },
        transition: {
            default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            smooth: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },
    motion: {
        duration: {
            instant: '0.1s',
            fast: '0.3s',
            normal: '0.4s',
            slow: '0.6s',
            slower: '0.8s'
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
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 30px rgba(26, 71, 49, 0.04)'
                    }
                }
            }
        },
        button: {
            variants: {
                solid: {
                    background: '#2F855A',
                    color: '#ffffff',
                    border: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        transform: 'translateY(-2px)',
                        background: '#276749',
                        boxShadow: '0 4px 12px rgba(47, 133, 90, 0.2)'
                    }
                },
                outline: {
                    background: 'transparent',
                    color: '#2F855A',
                    border: '1.5px solid currentColor',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        background: 'rgba(47, 133, 90, 0.05)',
                        transform: 'translateY(-2px)'
                    }
                }
            }
        },
        input: {
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            focus: {
                border: '1px solid rgba(47, 133, 90, 0.5)',
                boxShadow: '0 0 0 3px rgba(47, 133, 90, 0.1)'
            }
        }
    }
}
